"use server";

import { auth } from "@/auth";
import { createOrderRequest } from "@/lib/drive/orders";
import { getAvailableBudgets } from "@/lib/globals";
import { sendOrderConfirmation } from "@/lib/slack/order-confirmation";
import { formSchema } from "./form-schema";

export type FormState = {
  success: boolean;
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  url?: string;
  resetKey?: string;
  requestId?: string;
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

  if (!parsed.data.unitCost.match(/^\d+(\.\d+)?$/)) {
    return {
      success: false,
      message: "Invalid product cost",
      fields: parsed.data,
    };
  }

  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, message: "You must be signed in to submit an order." };
  }
  if (!getAvailableBudgets(session.user).some(
    (budget) => budget.code === parsed.data.budget
  )) {
    return { success: false, message: "You do not have access to this budget." };
  }

  // the form's email field is read-only, so always record the signed-in email
  const email = session.user.email.trim().toLowerCase();

  // log request
  const order = await createOrderRequest({ ...parsed.data, email });

  // send receipt reminder Slack message to payee
  await sendOrderConfirmation({
    recipientEmail: email,
    requestId: order.requestId,
  }).catch((err: any) => {
    console.error(err);
  });

  return {
    success: true,
    message: "Order request submitted!",
    requestId: order.requestId,
    resetKey: Date.now().toString(),
  };
}
