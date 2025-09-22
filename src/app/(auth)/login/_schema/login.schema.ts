import { emailSchema, passwordSchema } from "@/schema";
import { z } from "zod";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type TypeLogin = z.infer<typeof loginSchema>;
