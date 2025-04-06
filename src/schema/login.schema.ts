import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("유효하지 않은 이메일 형식입니다.")
    .trim()
    .min(1, "이메일을 입력해주세요."),
  password: z
    .string()
    .trim()
    .min(8, "영문, 숫자, 특수문자를 조합하여 8자리 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "영문, 숫자, 특수문자를 조합하여 8자리 이상이어야 합니다."
    ),
});

export type TypeLogin = z.infer<typeof loginSchema>;
