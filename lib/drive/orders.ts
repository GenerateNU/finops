import dayjs from "dayjs";
import { google } from "googleapis";

import { OrderRequest } from "@/types";

import { BUDGETS } from "../globals";
import { sendNewOrderNotification } from "../slack/team-notification";
import { camelize, getEnv } from "../utils";

/**
 * Create an order request with the given request data.
 *
 * @param requestData the order request data
 * @returns the requestId and if the request was successfully logged
 */
export async function createOrderRequest(
  requestData: OrderRequest,
): Promise<{
  success: boolean;
  requestId: string;
}> {
  const TODAY = dayjs().format("MM/DD/YYYY");

  // get budget data
  const budgetLineItem = BUDGETS.find(
    (budget) => budget.code === requestData.budget,
  );
  if (!budgetLineItem) {
    throw new Error("Invalid budget");
  }
  const branch = budgetLineItem?.branch;
  const team = budgetLineItem?.subTeam;

  // determine index code
  // const indexCode =
  //   requestData.purpose === "Client Project Materials" ||
  //   requestData.purpose === "Showcase"
  //     ? "390255"
  //     : "368429";

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
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // insert data into database
  const rangePrefix = "'Order Requests'!";
  const newDbRowId = await sheets.spreadsheets.values
    .append({
      spreadsheetId: getEnv("ORDER_REQUESTS_DB_FILE_ID"),
      range: rangePrefix + "B3:R",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            requestData.name,
            requestData.email,
            TODAY,
            "Pending Review",
            branch,
            team,
            budgetLineItem,
            requestData.purpose,
            requestData.productDescription,
            requestData.vendor,
            requestData.productLink,
            requestData.unitCost,
            "",
            requestData.quantity,
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

  // send new order request notification in configured Slack channel
  await sendNewOrderNotification({
    requestorName: requestData.name,
    requestorEmail: requestData.email,
    teamName: team,
    purpose: requestData.purpose,
    budget: requestData.budget,
    vendorName: requestData.vendor,
    productDescription: requestData.productDescription,
    productLink: requestData.productLink,
    requestId: requestId,
  }).catch((err: any) => {
    console.error(err);
  });

  return {
    success: true,
    requestId: requestId,
  };
}

/**
 * Get all recorded order requests for the given email. If not provided, returns all requests.
 *
 * @param email the email to filter results by
 * @returns the resulting rows
 */
export async function getOrderRequests(email?: string) {
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
      spreadsheetId: getEnv("ORDER_REQUESTS_DB_FILE_ID"),
      range: "B2:R",
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
