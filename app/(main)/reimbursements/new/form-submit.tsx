"use server";

import { createExpenseVoucher } from "@/lib/sheets";
import { formSchema } from "./form-schema";

export type FormState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  url?: string;
  resetKey?: string;
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    return {
      success: false,
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  if (!parsed.data.expenseDate.match(/^\d{4}\-{1}\d{2}\-{1}\d{2}$/)) {
    return {
      success: false,
      message:
        "Invalid expense date formatting; must be formatted as YYYY-MM-DD",
      fields: parsed.data,
    };
  }

  const voucher = await createExpenseVoucher(parsed.data);

  return {
    success: true,
    message: "Reimbursement request submitted!",
    url: voucher.spreadsheetUrl || undefined,
    resetKey: Date.now().toString(),
  };
}
