import { commonSchema } from "@/schema";
import { z } from "zod";

export const loginSchema = z.object({
  email: commonSchema.shape.email,
  password: commonSchema.shape.password,
});

export type TypeLogin = z.infer<typeof loginSchema>;
