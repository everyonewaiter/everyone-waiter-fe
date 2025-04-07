import z from "zod";

export const signupSchema = z.object({
  email: z
    .string()
    .email("유효하지 않은 이메일 형식입니다.")
    .trim()
    .min(1, "이메일은 필수입니다."),
  phone: z
    .string()
    .regex(/^\d{9,11}$/, "유효하지 않은 휴대폰 번호 형식입니다.")
    .trim()
    .min(1, "휴대폰 번호는 필수입니다."),
  authNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{6}$/.test(val), {
      message: "인증 번호는 6자리 숫자여야 합니다.",
    }),
  password: z
    .string()
    .min(8, "영문, 숫자, 특수문자를 조합하여 8자리 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "영문, 숫자, 특수문자를 조합하여 8자리 이상이어야 합니다."
    )
    .trim()
    .min(1, "비밀번호는 필수입니다."),
  confirm: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
          val
        ),
      {
        message: "영문, 숫자, 특수문자를 조합하여 8자리 이상이어야 합니다.",
      }
    ),
});

export type TypeSignup = z.infer<typeof signupSchema>;
