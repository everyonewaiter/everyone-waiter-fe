import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "이메일을 입력해주세요." })
  .email({ message: "유효하지 않은 이메일 형식입니다." });

export const phoneSchema = z
  .string()
  .min(1, "전화번호를 입력해주세요.")
  .startsWith("0", { message: "잘못된 전화번호 형식입니다." })
  .refine(
    (val) =>
      val.length < 1 ||
      /^(01[016789]-\d{4}-\d{4}|02-\d{4}-\d{4}|0\d{2}-\d{3}-\d{4})$/.test(val),
    {
      message: "유효하지 않은 전화번호 형식입니다.",
    }
  );

export const licenseSchema = z
  .string()
  .min(1, "사업자 번호를 입력해주세요.")
  .refine(
    (val) =>
      /^\d{3}-(?:0[1-9]|[1-6][0-9]|7[0-9]|81|82|86|87|9[0-9])-\d{5}$/.test(val),
    {
      message: "유효하지 않은 사업자 번호 형식입니다.",
    }
  );

export const passwordSchema = z
  .string()
  .trim()
  .min(1, { message: "비밀번호를 입력해주세요." })
  .refine(
    (val) =>
      val.length < 1 ||
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+\-=/;'?:",.<>[\]\\{}|])[A-Za-z\d~!@#$%^&*()_+\-=/;'?:",.<>[\]\\{}|]{8,}$/.test(
        val
      ),
    {
      message: "영문, 숫자, 특수문자를 조합하여 8자리 이상이어야 합니다.",
    }
  );

export const authNumberSchema = (isAuthActive: boolean) =>
  isAuthActive
    ? z
        .string()
        .trim()
        .min(6, "인증 번호는 6자리 숫자여야 합니다.")
        .max(6, "인증 번호는 6자리 숫자여야 합니다.")
        .refine((val) => !val || /^\d{6}$/.test(val), {
          message: "인증 번호는 6자리 숫자여야 합니다.",
        })
    : z.string();

export const deviceNumberSchema = z
  .string()
  .trim()
  .min(10, "기기 번호는 10자리입니다.")
  .max(10, "기기 번호는 10자리입니다.")
  .refine((val) => !val || /^[A-Z0-9]{10}$/.test(val), {
    message: "기기 번호는 영문, 숫자를 조합한 10자리여야 합니다.",
  });

const fileSchema =
  typeof window !== "undefined"
    ? z
        .instanceof(File)
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "application/pdf"].includes(
              file.type
            ) || /\.(jpe?g|png|pdf)$/i.test(file.name),
          {
            message: "jpg, png, pdf만 업로드할 수 있습니다.",
          }
        )
    : z.any();

export const imageSchema = z.union([fileSchema, z.string()]);
