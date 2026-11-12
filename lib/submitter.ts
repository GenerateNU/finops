import { auth } from "@/auth";
import { getAvailableBudgets } from "./globals";
import { normalize } from "./utils";

/**
 * Get the signed-in submitter's email after verifying they can use the budget.
 * Request forms show email read-only, so the session email is always recorded.
 *
 * @param budget the budget code being submitted against
 * @returns the normalized email, or an error message
 */
export async function getSubmitterEmail(
  budget: string
): Promise<{ email: string } | { error: string }> {
  const session = await auth();
  if (!session?.user?.email) {
    return { error: "You must be signed in to submit a request." };
  }
  if (!getAvailableBudgets(session.user).some((b) => b.code === budget)) {
    return { error: "You do not have access to this budget." };
  }
  return { email: normalize(session.user.email) };
}
