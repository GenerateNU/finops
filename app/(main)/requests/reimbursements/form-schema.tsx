import { z } from "zod";

export const formSchema = z.object({
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
  budgetBranch: z.enum(["Engagement", "Hardware", "Operations", "Software"]),
  budgetTeam: z.enum([
    // Engagement
    "Content",
    "Events",
    "Member Journeys",
    // Hardware
    "C-Star",
    "FuFu Pot",
    "Makerspace",
    "Muscle Recovery",
    "WaveWise",
    "Workshops",
    // Operations
    "Finance",
    "Information",
    "Strategy",
    // Software
    "Carbon",
    "Care-Wallet",
    "Couplet",
    "SAC",
    "Tubender",
  ]),
  expenseDate: z
    .string()
    .length(10, {
      message: "Expense date is required",
    })
    .regex(
      /^\d{4}\-{1}\d{2}\-{1}\d{2}$/,
      "Expense date must be formatted as YYYY-MM-DD"
    ),
  // expenseDate: z.date().optional(),
  // expenseTotal: z.preprocess(
  //   (a) => parseFloat(z.string().parse(a)),
  //   z.number().gte(1, "Must be at least $1")
  // ),
  expenseTotal: z
    .string({
      message: "Expense total is required",
    })
    .trim(),
  expenseDescription: z.string().trim().min(3, {
    message: "Expense description is required",
  }),
  expensePurpose: z.string().trim().min(5, {
    message: "Expense purpose is required",
  }),
});
