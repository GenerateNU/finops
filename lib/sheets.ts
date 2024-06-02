import { ExpenseVoucher } from "@/types";
import dayjs from "dayjs";

import { google, sheets_v4 } from "googleapis";

// export async function getGoogleSheetsData(range: string) {
//   const auth = await google.auth.getClient({
//     projectId: process.env.GOOGLE_PROJECT_ID,
//     credentials: {
//       type: "service_account",
//       private_key: process.env
//         .GOOGLE_PRIVATE_KEY!.split(String.raw`\n`)
//         .join("\n"),
//       client_email: process.env.GOOGLE_CLIENT_EMAIL,
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       token_url: "https://oauth2.googleapis.com/token",
//       universe_domain: "googleapis.com",
//     },
//     scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//   });

//   const sheets = google.sheets({ version: "v4", auth });

//   const data = await sheets.spreadsheets.values.get({
//     spreadsheetId: process.env.GOOGLE_SHEET_ID,
//     range: range,
//   });

//   return data.data;
// }

export async function createExpenseVoucher(
  expense: ExpenseVoucher
): Promise<sheets_v4.Schema$Spreadsheet> {
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

  // delete a file
  // await drive.files.delete({
  //   fileId: newVoucher.data.spreadsheetId,
  // });

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
  const rangePrefix = "'Page 1'!";
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

  return newVoucher.data;
}

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

  // delete a file
  await drive.files
    .delete({
      fileId,
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Unable to delete file");
    });
}
