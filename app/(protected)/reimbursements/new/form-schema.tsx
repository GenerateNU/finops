import { z } from "zod";

import dayjs from "@/lib/dayjs";

const baseSchema = {
  name: z.string().trim().min(2, {
    message: "Name is required",
  }),
  email: z.string().trim().email({
    message: "Email is required",
  }),
  nuid: z
    .string({
      message: "NUID is required",
    })
    .trim()
    .length(9, {
      message: "NUID should be nine (9) digits",
    })
    .regex(/^\d+$/, { message: "NUID must contain only digits" }),
  address: z.string().trim().min(10, {
    message: "Address is required",
  }),

  transactionDate: z.date({ message: "Transaction date is required" }),
  expenseTotal: z.coerce
    .string({
      message: "Expense total is required",
    })
    .refine(
      (value) => {
        return Number.isInteger(parseFloat(value) * 100);
      },
      {
        message: "Expense total must have at most two decimal places",
      }
    ),
  expensePurpose: z.string().trim().min(5, {
    message: "Expense purpose is required",
  }),
  budget: z.string().min(1, { message: "A budget is required" }),
  expenseDescription: z.string().trim().min(3, {
    message: "Expense description is required",
  }),
  preApproved: z.boolean().default(false).optional(),

  hasReceipt: z.literal<boolean>(true, {
    errorMap: () => ({
      message: "Please acknowledge the itemized receipt requirement",
    }),
  }),
};

export const formSchema = z.object({
  ...baseSchema,
});

export const formServerSchema = z.object({
  ...baseSchema,
  preApproved: z
    .string()
    .toLowerCase()
    .transform((x) => x === "on")
    .pipe(z.boolean().default(false))
    .optional(),
  hasReceipt: z
    .string({ message: "Please acknowledge the itemized receipt requirement" })
    .toLowerCase()
    .transform((x) => x === "on")
    .pipe(z.boolean()),
  transactionDate: z
    .string({ message: "Transaction date is required" })
    .regex(
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
      "Transaction date must be a valid ISO date",
    )
    .transform((x) => dayjs(x).toDate())
    .pipe(z.date()),
});
