import { commonSchema } from "@/schema";
import z from "zod";

export const signupSchema = z
  .object({
    email: commonSchema.shape.email,
    phone: commonSchema.shape.phone,
    authNumber: commonSchema.shape.authNumber,
    password: commonSchema.shape.password,
    confirm: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type TypeSignup = z.infer<typeof signupSchema>;
