import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "./dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

/**
 * Get the given environment variable, if defined.
 *
 * @param name name of the desired environment variable
 * @returns the environment variable's value
 */
export function getEnv(name: string): string {
  // handle public environment variables
  switch (name) {
    case "NEXT_PUBLIC_WIKI_PROCUREMENT_URL":
      return process.env.NEXT_PUBLIC_WIKI_PROCUREMENT_URL ?? "";
    case "NEXT_PUBLIC_EXPENSE_PROPOSAL_FORM_URL":
      return process.env.NEXT_PUBLIC_EXPENSE_PROPOSAL_FORM_URL ?? "";
    case "NEXT_PUBLIC_BUDGET_BALANCES_SHEET_URL":
      return process.env.NEXT_PUBLIC_BUDGET_BALANCES_SHEET_URL ?? "";
    case "NEXT_PUBLIC_SLACK_HELP_CHANNEL_NAME":
      return process.env.NEXT_PUBLIC_SLACK_HELP_CHANNEL_NAME ?? "";
    case "NEXT_PUBLIC_SLACK_HELP_CHANNEL_URL":
      return process.env.NEXT_PUBLIC_SLACK_HELP_CHANNEL_URL ?? "";
    case "NEXT_PUBLIC_ORDER_PLACEMENT_SCHEDULE":
      return process.env.NEXT_PUBLIC_ORDER_PLACEMENT_SCHEDULE ?? "";
    default:
      break;
  }

  // handle all other environment variables
  if (typeof process.env[name] === "undefined") {
    throw new Error(`Environment variable ${name} undefined.`);
  }

  return process.env[name]!;
}

/**
 * Get initials for the given name.
 *
 * @param name name to get initials from
 * @returns extracted initials
 */
export function getInitials(name: string): string {
  const words = name.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.join("");
}

/**
 * Returns a greeting message based on the current time of day.
 *
 * @returns A greeting message: "Good morning", "Good afternoon", or "Good evening".
 */
export function getGreeting(): string {
  const currentHour = dayjs().hour();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

/**
 * Compose a URL to the specified Google Drive file based on its file type.
 *
 * @param type the type of Google Drive file
 * @param fileId the unique file ID
 * @returns the composed Google Drive URL
 */
export function getDriveUrl(
  type: "folder" | "sheet",
  fileId: string
): string {
  switch (type) {
    case "folder":
      return "https://drive.google.com/drive/folders/" + fileId;
    case "sheet":
      return "https://docs.google.com/spreadsheets/d/" + fileId;
  }
}

/**
 * Checks the validity of the given URL,
 *
 * @param str potential URL to validate
 * @returns if the given text is a valid URL
 */
export function isValidUrl(str: string) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};
