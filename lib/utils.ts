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
