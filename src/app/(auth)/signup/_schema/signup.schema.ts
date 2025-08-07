import {
  emailSchema,
  phoneSchema,
  authNumberSchema,
  passwordSchema,
} from "@/schema";
import z from "zod";

export const signupSchema = z
  .object({
    email: emailSchema,
    phone: phoneSchema,
    authNumber: authNumberSchema,
    password: passwordSchema,
    confirm: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type TypeSignup = z.infer<typeof signupSchema>;
