import { z } from "zod";

import { formSchema as reimbursementRequestSchema } from "@/app/(main)/requests/reimbursements/form-schema";

export type ExpenseVoucher = z.infer<typeof reimbursementRequestSchema>;

export enum Branch {
  Engagement = "Engagement",
  Hardware = "Hardware",
  Operations = "Operations",
  Software = "Software",
}

