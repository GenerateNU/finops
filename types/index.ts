import { z } from "zod";

import { formSchema as orderRequestSchema } from "@/app/(protected)/orders/new/form-schema";
import { formSchema as reimbursementRequestSchema } from "@/app/(protected)/reimbursements/new/form-schema";

export type ExpenseVoucher = z.infer<typeof reimbursementRequestSchema>;
export type OrderRequest = z.infer<typeof orderRequestSchema>;

export enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  nuid?: string;
  role: "member" | "admin";
  branch?: string;
  team?: string;
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
  icon?: React.ReactElement<HTMLElement>;
};
