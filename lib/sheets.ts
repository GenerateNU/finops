import dayjs from "dayjs";
import { drive_v3, google } from "googleapis";
// import PDFMerger from "pdf-merger-js";

import { ExpenseVoucher } from "@/types";

import { BUDGETS } from "./globals";
import { camelize, getDriveUrl, getEnv } from "./utils";

/**
 * Create and autofill an expense voucher based on the spreadsheet template and the given expense data.
 *
 * @param voucherData the expense voucher data
 * @returns the resulting spreadsheet
 */
export async function createExpenseVoucher(
  voucherData: ExpenseVoucher,
): Promise<{
  requestId: string;
  voucherUrl: string;
  receiptsFolderUrl: string;
}> {
  const TODAY = dayjs().format("MM/DD/YYYY");

  const budgetLineItem = BUDGETS.find(
    (budget) => budget.code === voucherData.budget,
  );
  if (!budgetLineItem) {
    throw new Error("Invalid budget");
  }
  const branch = budgetLineItem?.team;
  const team = budgetLineItem?.subTeam;

  const indexCode =
    voucherData.expensePurpose === "Client Project Materials" ||
    voucherData.expensePurpose === "Showcase"
      ? "390255"
      : "368429";

  const auth = await google.auth.getClient({
    projectId: getEnv("GOOGLE_PROJECT_ID"),
    credentials: {
      type: "service_account",
      private_key: getEnv("GOOGLE_PRIVATE_KEY")
        .split(String.raw`\n`)
        .join("\n"),
      client_email: getEnv("GOOGLE_CLIENT_EMAIL"),
      client_id: getEnv("GOOGLE_CLIENT_ID"),
      token_url: "https://oauth2.googleapis.com/token",
      universe_domain: "googleapis.com",
    },
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  const drive = google.drive({ version: "v3", auth });
  const sheets = google.sheets({ version: "v4", auth });

  // get template spreadsheet data
  const template = await sheets.spreadsheets.get({
    spreadsheetId: getEnv("EXPENSE_VOUCHER_TEMPLATE_FILE_ID"),
    includeGridData: true,
  });

  // prepare spreadsheet template
  let newSpreadsheetData = {
    ...template.data,
    spreadsheetId: null,
    properties: {
      title: `ERV - ${dayjs().format("YYYY-MM-DD")} - ${voucherData.name}`,
    },
  };

  // create new spreadsheet
  const newVoucher = await sheets.spreadsheets
    .create({
      requestBody: newSpreadsheetData,
    })
    .catch((err) => console.log(err));

  if (!newVoucher || !newVoucher.data || !newVoucher.data.spreadsheetId) {
    throw new Error("Could not create expense voucher");
  }

  // share file with google drive user to view
  await drive.permissions
    .create({
      fileId: newVoucher.data.spreadsheetId,
      requestBody: {
        role: "writer",
        type: "user",
        emailAddress: getEnv("GOOGLE_OWNER_EMAIL"),
      },
    })
    .catch((err) => console.log(err));

  // move file
  await drive.files
    .get({
      fileId: newVoucher.data.spreadsheetId,
      fields: "parents",
    })
    .then((file) => {
      const previousParents = file.data.parents?.join(",");
      if (
        !previousParents ||
        previousParents.length === 0 ||
        !previousParents?.includes(getEnv("EXPENSE_VOUCHERS_FOLDER_ID"))
      ) {
        drive.files.update({
          fileId: newVoucher.data.spreadsheetId!,
          addParents: getEnv("EXPENSE_VOUCHERS_FOLDER_ID"),
          removeParents: previousParents,
          fields: "id, parents",
        });
      }
    })
    .catch((err) => console.log(err));

  // insert data into voucher
  let rangePrefix = "'Page 1'!";
  await sheets.spreadsheets.values
    .batchUpdate({
      spreadsheetId: newVoucher.data.spreadsheetId,
      requestBody: {
        data: [
          {
            range: rangePrefix + "C4:C6",
            values: [[TODAY], [voucherData.name], [voucherData.nuid]],
          },
          {
            range: rangePrefix + "F5",
            values: [[voucherData.address]],
          },
          {
            range: rangePrefix + "G6",
            values: [[voucherData.email]],
          },
          // expense metadata
          {
            range: rangePrefix + "H10:H12",
            values: [
              [voucherData.expenseDescription],
              [dayjs(voucherData.transactionDate).format("MM/DD/YYYY")],
              [voucherData.expensePurpose],
            ],
          },
          // expense details
          {
            range: rangePrefix + "E30:G30",
            values: [[indexCode, 73325, voucherData.expenseTotal]],
          },
          // student details
          {
            range: rangePrefix + "D42",
            values: [[voucherData.name]],
          },
          // supervisor details
          {
            range: rangePrefix + "D47",
            values: [[getEnv("EXPENSE_VOUCHER_SUPERVISOR")]],
          },
        ],
        valueInputOption: "USER_ENTERED",
      },
    })
    .catch((err) => console.log(err));

  // create folder for receipts
  const receiptsFolderFileMetadata = {
    name: `ERV-R - ${dayjs().format("YYYY-MM-DD")} - ${voucherData.name}`,
    mimeType: "application/vnd.google-apps.folder",
    parents: [getEnv("RECEIPTS_FOLDER_ID")],
  };

  const receiptsFolderId = await drive.files
    .create({
      requestBody: receiptsFolderFileMetadata,
      fields: "id",
    })
    .then((file) => file.data.id);
  if (!receiptsFolderId) throw new Error("Receipts folder not created");

  // allow anyone to upload files
  await drive.permissions
    .create({
      fileId: receiptsFolderId,
      requestBody: {
        role: "writer",
        type: "anyone",
      },
    })
    .catch((err) => console.log(err));

  // insert data into database
  rangePrefix = "'Reimbursements'!";
  const newDbRowId = await sheets.spreadsheets.values
    .append({
      spreadsheetId: getEnv("REIMBURSEMENT_REQUESTS_DB_FILE_ID"),
      range: rangePrefix + "B3:N",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            voucherData.name,
            voucherData.email,
            TODAY,
            "Missing Receipt",
            branch,
            team,
            dayjs(voucherData.transactionDate).format("YYYY-MM-DD"),
            voucherData.expensePurpose,
            voucherData.expenseTotal,
            voucherData.preApproved ? true : false,
            voucherData.expenseDescription,
            newVoucher.data.spreadsheetId,
            receiptsFolderId,
          ],
        ],
      },
    })
    .then((res) => {
      const range = res.data.updates?.updatedRange;
      if (range) {
        const matches = range.match(/\d+/);
        if (matches) {
          return matches[0].padStart(2, "0");
        }
      }
      return "?";
    })
    .catch((err) => console.log(err));

  let requestId = branch.charAt(0);
  requestId += team.charAt(0);
  requestId += team.charAt(1);
  requestId += newDbRowId;
  requestId = requestId.toUpperCase();

  return {
    requestId: requestId,
    voucherUrl: newVoucher.data.spreadsheetUrl ?? "",
    receiptsFolderUrl: getDriveUrl("folder", receiptsFolderId),
  };
}

/**
 * Get all recorded reimbursement requests for the given purchaser's email. If not provided, returns all requests.
 *
 * @param email the purchaser's email to filter results by
 * @returns the resulting rows
 */
export async function getReimbursementRequests(email?: string) {
  try {
    const auth = await google.auth.getClient({
      projectId: getEnv("GOOGLE_PROJECT_ID"),
      credentials: {
        type: "service_account",
        private_key: getEnv("GOOGLE_PRIVATE_KEY")
          .split(String.raw`\n`)
          .join("\n"),
        client_email: getEnv("GOOGLE_CLIENT_EMAIL"),
        client_id: getEnv("GOOGLE_CLIENT_ID"),
        token_url: "https://oauth2.googleapis.com/token",
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: getEnv("REIMBURSEMENT_REQUESTS_DB_FILE_ID"),
      range: "B2:N",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log("No data found.");
      return;
    }

    const columnIndex = rows[0].indexOf("Email");
    if (columnIndex === -1) {
      console.log(`Column "Email" not found.`);
      return [];
    }

    const objects = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!email || (email && row[columnIndex] === email)) {
        const obj: any = {};
        rows[0].forEach((header, columnIndex) => {
          obj[camelize(header)] = row[columnIndex];
        });
        obj["id"] = i + 2; // add 2 to account for header rows
        objects.push(obj);
      }
    }

    return objects;
  } catch (err) {
    console.error("The API returned an error:", err);
    throw err;
  }
}

/**
 * Get all non-trashed files in the expense vouchers folder.
 *
 * @returns the files
 */
export async function getExpenseVoucherFiles(): Promise<drive_v3.Schema$FileList> {
  const auth = await google.auth.getClient({
    projectId: getEnv("GOOGLE_PROJECT_ID"),
    credentials: {
      type: "service_account",
      private_key: getEnv("GOOGLE_PRIVATE_KEY")
        .split(String.raw`\n`)
        .join("\n"),
      client_email: getEnv("GOOGLE_CLIENT_EMAIL"),
      client_id: getEnv("GOOGLE_CLIENT_ID"),
      token_url: "https://oauth2.googleapis.com/token",
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });

  // get the files
  const files = await drive.files
    .list({
      q: `'${getEnv(
        "EXPENSE_VOUCHERS_FOLDER_ID",
      )}' in parents and trashed = false`,
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Unable to list files");
    });

  return files.data;
}

/**
 * Create an Expense Reimbursement Voucher packet.
 *
 * @returns the files
 */
// export async function createERVPacket(
//   filePrefix: string,
//   voucherFileId: string,
//   receiptFolderId: string
// ): Promise<any> {
//   const auth = await google.auth.getClient({
//     projectId: getEnv("GOOGLE_PROJECT_ID"),
//     credentials: {
//       type: "service_account",
//       private_key: getEnv("GOOGLE_PRIVATE_KEY")
//         .split(String.raw`\n`)
//         .join("\n"),
//       client_email: getEnv("GOOGLE_CLIENT_EMAIL"),
//       client_id: getEnv("GOOGLE_CLIENT_ID"),
//       token_url: "https://oauth2.googleapis.com/token",
//       universe_domain: "googleapis.com",
//     },
//     scopes: ["https://www.googleapis.com/auth/drive"],
//   });

//   const drive = google.drive({ version: "v3", auth });

//   // export voucher file
//   const voucherFileBlob = await drive.files
//     .export({
//       fileId: voucherFileId,
//       mimeType: "application/pdf",
//     })
//     .then(async (res) => res.data);

//   // get ID of first file in the receipt folder
//   const receiptFileId = await drive.files
//     .list({
//       q: `'${receiptFolderId}' in parents and trashed = false`,
//     })
//     .then((res) => {
//       if (!res.data.files || res.data.files?.length === 0) {
//         throw new Error("No receipts");
//       }

//       return res.data.files[0].id;
//     });
//   if (!receiptFileId) {
//     throw new Error("Could not got receipt file ID");
//   }

//   // get receipt file contents
//   const receiptFileBlob = await drive.files
//     .get({
//       fileId: receiptFileId,
//       alt: "media",
//     })
//     .then(async (res) => res.data);

//   // merge voucher with receipt
//   const merger = new PDFMerger();
//   await merger.add(await (voucherFileBlob as any).arrayBuffer());
//   await merger.add(await (receiptFileBlob as any).arrayBuffer());
//   const mergedFileBuffer = await merger.saveAsBuffer();

//   // upload merged PDF
//   const requestBody = {
//     name: filePrefix + ".pdf",
//     parents: [getEnv("EXPENSE_VOUCHERS_FOLDER_ID")],
//     fields: "id",
//   };
//   const media = {
//     mimeType: "application/pdf",
//     body: Readable.from(mergedFileBuffer),
//   };
//   const file = await drive.files.create({
//     requestBody,
//     media: media,
//   });

//   return file.data.id;
// }

/**
 * Delete a given file owned by the FinOps service account.
 *
 * @param fileId the ID of the file to delete
 */
export async function deleteFile(fileId: string): Promise<void> {
  const auth = await google.auth.getClient({
    projectId: getEnv("GOOGLE_PROJECT_ID"),
    credentials: {
      type: "service_account",
      private_key: getEnv("GOOGLE_PRIVATE_KEY")
        .split(String.raw`\n`)
        .join("\n"),
      client_email: getEnv("GOOGLE_CLIENT_EMAIL"),
      client_id: getEnv("GOOGLE_CLIENT_ID"),
      token_url: "https://oauth2.googleapis.com/token",
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });

  // delete the file
  await drive.files
    .delete({
      fileId,
    })
    .catch((err) => {
      if (err?.status && err.status === 404) {
        throw new Error("Specified file not found");
      }

      throw new Error(err?.message || "Unable to delete file");
    });
}

/**
 * Get the membership data for the given member by their email address
 *
 * @param email the member's email address
 * @returns the resulting rows
 */
export async function getMember(email: string) {
  try {
    const auth = await google.auth.getClient({
      projectId: getEnv("GOOGLE_PROJECT_ID"),
      credentials: {
        type: "service_account",
        private_key: getEnv("GOOGLE_PRIVATE_KEY")
          .split(String.raw`\n`)
          .join("\n"),
        client_email: getEnv("GOOGLE_CLIENT_EMAIL"),
        client_id: getEnv("GOOGLE_CLIENT_ID"),
        token_url: "https://oauth2.googleapis.com/token",
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: getEnv("MEMBERS_ROSTER_FILE_ID"),
      range: "B2:M",
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      console.log("No data found.");
      return;
    }

    const columnIndex = rows[0].indexOf("Email");
    if (columnIndex === -1) {
      console.log(`Column "Email" not found.`);
      return [];
    }

    const objects = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!email || (email && row[columnIndex] === email)) {
        const obj: any = {};
        rows[0].forEach((header, columnIndex) => {
          obj[camelize(header)] = row[columnIndex];
        });
        obj["id"] = i + 2; // add 2 to account for header rows
        objects.push(obj);
      }
    }

    if (objects.length === 0) {
      throw new Error("No matching member");
    }

    return objects[0];
  } catch (err) {
    console.error("The API returned an error:", err);
    throw err;
  }
}
