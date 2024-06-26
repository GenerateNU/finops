import { z } from "zod";

export const formSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Name is required",
  }),
  email: z.string().trim().email({
    message: "Email is required",
  }),
  budgetBranch: z.enum(["Engagement", "Hardware", "Operations", "Software"], {
    message: "A valid branch is required",
  }),
  budgetTeam: z.string({ message: "A valid team is required" }),
  vendor: z.enum(
    [
      "4imprint",
      "Adafruit",
      "Amazon",
      "AndyMark",
      "Arduino",
      "Custom Ink",
      "DigiKey",
      "eBay",
      // "Foambymail",
      "Formlabs",
      // "Grainger Industrial Supplies",
      "McMaster Carr",
      "Misumi",
      "Mouser",
      "Prolabs",
      "Protolabs",
      // "SendCutSend",
      "ServoCity",
      "Sparkfun",
      "Sticker Mule",
      "Vex Robotics",
      "Vistaprint",
      "Other",
    ],
    {
      message: "A valid vendor is required",
    }
  ),
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
