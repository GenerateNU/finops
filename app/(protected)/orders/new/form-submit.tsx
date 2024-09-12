"use server";

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

  if (!parsed.data.productCost.match(/^\d+(\.\d+)?$/)) {
    return {
      success: false,
      message: "Invalid product cost",
      fields: parsed.data,
    };
  }

  console.log(parsed);

  // const order = await createOrderRequest(parsed.data);

  // send receipt reminder Slack message to payee
  await sendOrderConfirmation({
    recipientEmail: parsed.data.email,
  }).catch((err: any) => {
    console.error(err);
  });

  return {
    success: false,
    message: "Order could not be submitted",
    fields: parsed.data,
  };

  // return {
  //   success: true,
  //   message: "Order request submitted!",
  //   // requestNo: order.requestNo || undefined,
  //   requestId: "AB234",
  //   resetKey: Date.now().toString(),
  // };
}
