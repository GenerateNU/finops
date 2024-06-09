import { z } from "zod";

export const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Name is required",
  }),
  email: z.string().trim().email({
    message: "Email is required",
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
  vendor: z.enum(["Amazon", "Other"]),
  productLink: z.string().trim().url({ message: "Invalid product link" }),
  productDescription: z.string().trim().min(3, {
    message: "Product description is required",
  }),
  productQuantity: z
    .string({
      message: "Product quantity is required",
    })
    .trim(),
  productCost: z.string().trim().min(1, {
    message: "Product cost is required",
  }),
  purpose: z.string().trim().min(5, {
    message: "Purpose is required",
  }),
});
