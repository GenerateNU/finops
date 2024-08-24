"use server";

import { deleteFile } from "@/lib/sheets";
import { formSchema } from "./form-schema";

export type FormState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  resetKey?: string;
};

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = formSchema.safeParse(formData);

  const fields: Record<string, string> = {};
  for (const key of Object.keys(formData)) {
    fields[key] = formData[key].toString();
  }

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  try {
    await deleteFile(parsed.data.fileId);
  } catch (err: any) {
    return {
      success: false,
      message: err?.message,
      fields,
    };
  }

  return {
    success: true,
    message: "File deleted!",
    resetKey: Date.now().toString(),
  };
}
