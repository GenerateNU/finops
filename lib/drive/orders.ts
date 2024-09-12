import dayjs from "dayjs";
import { google } from "googleapis";

import { OrderRequest } from "@/types";

import { BUDGETS } from "../globals";
import { getEnv } from "../utils";

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
            "",
            "",
            requestData.purpose,
            "",
            // requestData.preApproved ? true : false,
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

  return {
    success: true,
    requestId: requestId,
  };
}
