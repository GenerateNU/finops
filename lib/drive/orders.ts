import dayjs from "dayjs";
import { google } from "googleapis";

import { OrderRequest } from "@/types";

import { BUDGETS, PATTERNS } from "../globals";
import { sendNewOrderReqNotification } from "../slack/team-notification";
import { camelize, getEnv, normalize } from "../utils";

// Map roster team aliases to the names used by order budgets.
const NORMALIZED_ORDER_TEAM = new Map([
  ["x-ray", "automated x-ray"],
]);

function normalizeOrderTeam(team: string | undefined): string {
  const normalized = normalize(team);
  return NORMALIZED_ORDER_TEAM.get(normalized) ?? normalized;
}

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
      range: rangePrefix + "B3:P",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            requestData.name,
            requestData.email,
            TODAY,
            "Pending Review",
            team,
            branch,
            requestData.budget,
            requestData.purpose,
            requestData.productDescription,
            requestData.vendor,
            requestData.productLink,
            requestData.unitCost,
            requestData.quantity,
          ],
        ],
      },
    })
    .then((res) => {
      const range = res.data.updates?.updatedRange;
      if (range) {
        const matches = range.match(PATTERNS.RANGE_ROW);
        if (matches) {
          return matches[0].padStart(2, "0");
        }
      }
      return "?";
    })
    .catch((err) => console.log(err));

  // Use the budget code as the request ID prefix
  let requestId = budgetLineItem.code;
  requestId += "-" + newDbRowId;

  // send new order request notification in configured Slack channel
  await sendNewOrderReqNotification({
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
 * Get orders matching the supplied filters. All supplied filters must match.
 * No filters returns no orders.
 *
 * @param email the email to filter results by
 * @param team the team to filter results by
 * @param branch the branch to filter results by (alone for directors)
 * @returns the resulting rows
 */
export async function getOrderRequests({ email, team, branch }: { email?: string; team?: string; branch?: string }) {
  const normalizedTeam = normalizeOrderTeam(team);
  const normalizedEmail = normalize(email);
  const normalizedBranch = normalize(branch);
  if (!normalizedEmail && !normalizedTeam && !normalizedBranch) {
    console.log("An email, team, or branch filter is required.");
    return [];
  }

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

    const emailColumnIndex = rows[0].indexOf("Email");
    if (emailColumnIndex === -1) {
      console.log(`Column "Email" not found.`);
      return [];
    }

    const teamColumnIndex = rows[0].indexOf("Team");
    if (teamColumnIndex === -1) {
      console.log(`Column "Team" not found.`);
      return [];
    }

    const branchColumnIndex = rows[0].indexOf("Branch");
    if (normalizedBranch && branchColumnIndex === -1) {
      console.log(`Column "Branch" not found.`);
      return [];
    }

    const objects = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (normalizedEmail && normalize(row[emailColumnIndex]) !== normalizedEmail) continue;
      if (normalizedTeam && normalizeOrderTeam(row[teamColumnIndex]) !== normalizedTeam) continue;
      if (normalizedBranch && normalize(row[branchColumnIndex]) !== normalizedBranch) continue;

      const obj: any = {};
      rows[0].forEach((header, columnIndex) => {
        obj[camelize(header)] = row[columnIndex];
      });
      obj["id"] = i + 2; // add 2 to account for header rows
      objects.push(obj);
    }

    return objects;
  } catch (err) {
    console.error("The API returned an error:", err);
    throw err;
  }
}
