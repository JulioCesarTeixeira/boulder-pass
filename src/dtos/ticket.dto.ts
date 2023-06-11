import { z } from "zod";

export const FormDataSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email({ message: "Invalid email format" }),
  remarks: z.string().optional(),
});

export type FormDataType = z.infer<typeof FormDataSchema>;
