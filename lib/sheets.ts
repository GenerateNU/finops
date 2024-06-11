import dayjs from "dayjs";
import { drive_v3, google } from "googleapis";

import { ExpenseVoucher } from "@/types";

import { camelize } from "./utils";

/**
 * Create and autofill an expense voucher based on the spreadsheet template and the given expense data.
 *
 * @param expense the expense voucher data
 * @returns the resulting spreadsheet
 */
export async function createExpenseVoucher(
  expense: ExpenseVoucher
): Promise<{ requestId: string; voucherUrl: string }> {
  const TODAY = dayjs().format("MM/DD/YYYY");

  const auth = await google.auth.getClient({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: "service_account",
      private_key: process.env
        .GOOGLE_PRIVATE_KEY!.split(String.raw`\n`)
        .join("\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      token_url: "https://oauth2.googleapis.com/token",
      universe_domain: "googleapis.com",
    },
    scopes: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  const drive = google.drive({ version: "v3", auth });
  const sheets = google.sheets({ version: "v4", auth });

  // get template spreadsheet data
  const template = await sheets.spreadsheets.get({
    spreadsheetId: process.env.EXPENSE_VOUCHER_TEMPLATE_FILE_ID,
    includeGridData: true,
  });

  // prepare spreadsheet template
  let newSpreadsheetData = {
    ...template.data,
    spreadsheetId: null,
    properties: {
      title: `VOUCHER - ${dayjs().format("YYYY-MM-DD")} - ${expense.name}`,
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
        emailAddress: process.env.GOOGLE_OWNER_EMAIL,
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
        !previousParents?.includes(process.env.EXPENSE_VOUCHERS_FOLDER_ID!)
      ) {
        drive.files.update({
          fileId: newVoucher.data.spreadsheetId!,
          addParents: process.env.EXPENSE_VOUCHERS_FOLDER_ID,
          removeParents: previousParents,
          fields: "id, parents",
        });
      }
    })
    .catch((err) => console.log(err));

  // insert data
  let rangePrefix = "'Page 1'!";
  await sheets.spreadsheets.values
    .batchUpdate({
      spreadsheetId: newVoucher.data.spreadsheetId,
      requestBody: {
        data: [
          {
            range: rangePrefix + "C4:C6",
            values: [[TODAY], [expense.name], [expense.nuid]],
          },
          {
            range: rangePrefix + "F5",
            values: [[expense.address]],
          },
          {
            range: rangePrefix + "G6",
            values: [[expense.email]],
          },
          // expense metadata
          {
            range: rangePrefix + "H10:H12",
            values: [
              [expense.expenseDescription],
              [dayjs(expense.expenseDate).format("MM/DD/YYYY")],
              [expense.expensePurpose],
            ],
          },
          // expense details
          {
            range: rangePrefix + "E30:G30",
            values: [[368429, 73325, expense.expenseTotal]],
          },
          // student details
          {
            range: rangePrefix + "D42",
            values: [[expense.name]],
          },
          {
            range: rangePrefix + "G42",
            values: [[expense.name]],
          },
          {
            range: rangePrefix + "L42",
            values: [[TODAY]],
          },
          // supervisor details
          {
            range: rangePrefix + "D47",
            values: [[process.env.EXPENSE_VOUCHER_SUPERVISOR]],
          },
          {
            range: rangePrefix + "G47",
            values: [[process.env.EXPENSE_VOUCHER_SUPERVISOR]],
          },
          {
            range: rangePrefix + "L47",
            values: [[TODAY]],
          },
        ],
        valueInputOption: "USER_ENTERED",
      },
    })
    .catch((err) => console.log(err));

  // insert data
  rangePrefix = "'Reimbursements'!";
  const newDbRowId = await sheets.spreadsheets.values
    .append({
      spreadsheetId: process.env.REIMBURSEMENT_REQUESTS_DB_FILE_ID,
      range: rangePrefix + "B3:K",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            expense.name,
            expense.email,
            TODAY,
            expense.budgetBranch,
            expense.budgetTeam,
            expense.expenseDate,
            expense.expensePurpose,
            expense.expenseTotal,
            expense.expenseDescription,
            newVoucher.data.spreadsheetId,
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

  let requestId = expense.budgetBranch.charAt(0);
  requestId += expense.budgetTeam.charAt(0);
  requestId += expense.budgetTeam.charAt(1);
  requestId += newDbRowId;
  requestId = requestId.toUpperCase();

  return {
    requestId: requestId,
    voucherUrl: newVoucher.data.spreadsheetUrl ?? "",
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
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        type: "service_account",
        private_key: process.env
          .GOOGLE_PRIVATE_KEY!.split(String.raw`\n`)
          .join("\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        token_url: "https://oauth2.googleapis.com/token",
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.REIMBURSEMENT_REQUESTS_DB_FILE_ID,
      range: "B2:K",
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
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: "service_account",
      private_key: process.env
        .GOOGLE_PRIVATE_KEY!.split(String.raw`\n`)
        .join("\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      token_url: "https://oauth2.googleapis.com/token",
      universe_domain: "googleapis.com",
    },
    scopes: ["https://www.googleapis.com/auth/drive.file"],
  });

  const drive = google.drive({ version: "v3", auth });

  // get the files
  const files = await drive.files
    .list({
      q: `'${process.env.EXPENSE_VOUCHERS_FOLDER_ID}' in parents and trashed = false`,
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Unable to list files");
    });

  return files.data;
}

/**
 * Delete a given file owned by the FinOps service account.
 *
 * @param fileId the ID of the file to delete
 */
export async function deleteFile(fileId: string): Promise<void> {
  const auth = await google.auth.getClient({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: "service_account",
      private_key: process.env
        .GOOGLE_PRIVATE_KEY!.split(String.raw`\n`)
        .join("\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
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
 * Get all active member data for the given member's email. If not provided, returns all members.
 *
 * @returns the resulting rows
 */
export async function getMembers(email?: string) {
  try {
    const auth = await google.auth.getClient({
      projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        type: "service_account",
        private_key: process.env
          .GOOGLE_PRIVATE_KEY!.split(String.raw`\n`)
          .join("\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        token_url: "https://oauth2.googleapis.com/token",
        universe_domain: "googleapis.com",
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.MEMBERS_ROSTER_FILE_ID,
      range: "B2:L",
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

    // const objects = [];
    // for (let i = 1; i < rows.length; i++) {
    //   const row = rows[i];
    //   const obj: any = {};

    //   rows[0].forEach((header, columnIndex) => {
    //     obj[camelize(header)] = row[columnIndex];
    //   });

    //   objects.push(obj);
    // }

    if (objects.length === 0) {
      throw new Error("No matching members")
    }

    return objects[0];
  } catch (err) {
    console.error("The API returned an error:", err);
    throw err;
  }
}
