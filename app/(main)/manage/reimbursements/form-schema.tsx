import { z } from "zod";

export const formSchema = z.object({
  fileId: z.string().trim().length(44, {
    message: "File ID should be 44 characters",
  }),
});
