"use server";

import { createExpenseVoucher } from "@/lib/sheets";

import { formServerSchema } from "./form-schema";

export type FormState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  url?: string;
  receiptsFolderUrl?: string;
  resetKey?: string;
  requestId?: string;
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formServerSchema.safeParse(formData);

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

  const res = await createExpenseVoucher(parsed.data);

  return {
    success: true,
    message: "Reimbursement request submitted!",
    url: res.voucherUrl || undefined,
    requestId: res.requestId,
    receiptsFolderUrl: res.receiptsFolderUrl,
    resetKey: Date.now().toString(),
  };
}
