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
      "EasyEDA",
      "Edmund Optics",
      "Formlabs",
      "Harbor Freight",
      "JLCPCB",
      "McMaster-Carr",
      "Misumi",
      "Mouser Electronics",
      "Prolabs",
      "Protolabs",
      "ServoCity",
      "Sparkfun",
      "Sticker Mule",
      "ULINE",
      "US Plastics",
      "Vevor",
      "Vex Robotics",
      "Vistaprint",
      "WaveShare",
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
  unitCost: z.coerce.string({
    message: "Product cost is required",
  }),
  quantity: z
    .string({
      message: "Product quantity is required",
    })
    .trim(),
});
