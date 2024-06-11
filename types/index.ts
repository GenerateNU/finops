import { z } from "zod";

import { formSchema as reimbursementRequestSchema } from "@/app/(main)/reimbursements/new/form-schema";

export type ExpenseVoucher = z.infer<typeof reimbursementRequestSchema>;

export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  nuid?: string;
  isAdmin: boolean;
};

export enum Branch {
  Engagement = "Engagement",
  Hardware = "Hardware",
  Operations = "Operations",
  Software = "Software",
}

export type NavLink = {
  href: string;
  label: string;
  icon?: any;
};
