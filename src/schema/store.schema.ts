import { z } from "zod";

export const storeSchema = z.object({
  storeName: z
    .string()
    .min(1, "잘못된 형식입니다.")
    .max(20, "잘못된 형식입니다."),
  owner: z
    .string()
    .min(1, "잘못된 형식입니다.")
    .regex(/^[a-zA-Z가-힣]+$/, "한글 또는 영문만 가능합니다."),
  address: z.string().min(1, "잘못된 형식입니다."),
  phoneNumber: z.string().min(1, "잘못된 형식입니다."),
  businessNumber: z.string().min(1, "잘못된 형식입니다."),
});

export type TypeStore = z.infer<typeof storeSchema>;
