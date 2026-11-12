import { PATTERNS, VENDORS } from "@/lib/globals";
import { z } from "zod";

const WHOLE_NUMBER_PATTERN: RegExp = /^[1-9]\d*$/;

export const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Name is required",
  }),
  email: z.string().trim().email({
    message: "Email is required",
  }),

  purpose: z.string().trim().min(5, {
    message: "Purpose is required",
  }),
  budget: z.string().min(1, { message: "A budget is required" }),

  vendor: z.enum(["", ...VENDORS.map((v) => v.name)] as const, {
    message: "A valid vendor is required",
  }),
  productLink: z.string().trim().url({ message: "Invalid product link" }),
  productDescription: z.string().trim().min(3, {
    message: "Product description is required",
  }),
  unitCost: z
    .string({
      message: "Product cost is required",
    })
    .trim()
    .min(1, { message: "Product cost is required" })
    // pipe so only the first failing check is reported
    .pipe(z.string().regex(PATTERNS.DECIMAL_AMOUNT, { message: "Invalid product cost" }))
    .pipe(
      z.string().refine((cost) => Number(cost) > 0, {
        message: "Product cost must be greater than $0",
      })
    ),
  quantity: z
    .string({
      message: "Product quantity is required",
    })
    .trim()
    .regex(WHOLE_NUMBER_PATTERN, { message: "Quantity must be a whole number" }),
});
