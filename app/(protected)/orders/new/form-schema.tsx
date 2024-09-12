import { z } from "zod";

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

  vendor: z.enum(
    [
      "",
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
  productCost: z.coerce
    .string({
      message: "Product cost is required",
    })
    .refine(
      (value) => {
        return Number.isInteger(parseFloat(value) * 100);
      },
      {
        message: "Product cost must have at most two decimal places",
      }
    ),
  productQuantity: z
    .string({
      message: "Product quantity is required",
    })
    .trim(),
});
