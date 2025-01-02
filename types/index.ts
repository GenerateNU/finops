import { z } from "zod";

import { formSchema as orderRequestSchema } from "@/app/(protected)/orders/new/form-schema";
import { formSchema as reimbursementRequestSchema } from "@/app/(protected)/reimbursements/new/form-schema";

export type ExpenseVoucher = z.infer<typeof reimbursementRequestSchema>;
export type OrderRequest = z.infer<typeof orderRequestSchema>;

export enum UserRole {
  ADMIN = "admin",
  PL = "pl",
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
  position?: string;
};

export enum Branch {
  Engagement = "Engagement",
  Hardware = "Hardware",
  Operations = "Operations",
  Software = "Software",
}

export interface Vendor {
  name: string;
  url?: string;
}

export interface UrlUnfurl {
  hostname?: string;
  title?: string;
  author?: string;
  description?: string;
  favicon?: string;
  imageUrl?: string;
}
