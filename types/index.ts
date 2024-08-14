import { z } from "zod";

import { formSchema as reimbursementRequestSchema } from "@/app/(main)/reimbursements/new/form-schema";

export type ExpenseVoucher = z.infer<typeof reimbursementRequestSchema>;

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
