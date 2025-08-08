import {
  emailSchema,
  phoneSchema,
  authNumberSchema,
  passwordSchema,
} from "@/schema";
import z from "zod";

export const signupSchema = (authFocused: boolean) =>
  z
    .object({
      email: emailSchema,
      phone: phoneSchema,
      authNumber: authNumberSchema(authFocused),
      password: passwordSchema,
      confirm: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
    })
    .refine((data) => data.password === data.confirm, {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirm"],
    });

export type TypeSignup = z.infer<ReturnType<typeof signupSchema>>;
