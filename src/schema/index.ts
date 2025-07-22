import { z } from "zod";

export const commonSchema = z.object({
  email: z
    .string()
    .email("유효하지 않은 이메일 형식입니다.")
    .trim()
    .min(1, "이메일을 입력해주세요."),
  phone: z
    .string()
    .trim()
    .min(1, "전화번호를 입력해주세요.")
    .refine((val) => val === "" || /^01[016789]-\d{3,4}-\d{4}$/.test(val), {
      message: "유효하지 않은 휴대폰 번호 형식입니다.",
    }),
  password: z
    .string()
    .trim()
    .min(8, "영문, 숫자, 특수문자를 조합하여 8자리 이상이어야 합니다.")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "영문, 숫자, 특수문자를 조합하여 8자리 이상이어야 합니다."
    ),
  authNumber: z
    .string()
    .trim()
    .min(6, "인증 번호는 6자리 숫자여야 합니다.")
    .max(6, "인증 번호는 6자리 숫자여야 합니다.")
    .refine((val) => !val || /^\d{6}$/.test(val), {
      message: "인증 번호는 6자리 숫자여야 합니다.",
    }),
  deviceNumber: z
    .string()
    .trim()
    .min(10, "기기 번호는 10자리입니다.")
    .max(10, "기기 번호는 10자리입니다.")
    .refine((val) => !val || /^[A-Z0-9]{10}$/.test(val), {
      message: "기기 번호는 영문, 숫자를 조합한 10자리여야 합니다.",
    }),
});
