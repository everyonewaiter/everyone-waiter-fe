import { z } from "zod";

export const storeSchema = z.object({
  name: z.string().min(1, "잘못된 형식입니다.").max(20, "잘못된 형식입니다."),
  ceoName: z
    .string()
    .min(1, "잘못된 형식입니다.")
    .regex(/^[a-zA-Z가-힣]+$/, "한글 또는 영문만 가능합니다."),
  address: z.string().min(1, "잘못된 형식입니다."),
  landline: z.string().min(1, "잘못된 형식입니다."),
  license: z.string().min(1, "잘못된 형식입니다."),
});

export type TypeStore = z.infer<typeof storeSchema>;

export const storeInfoSchema = z.object({
  name: z.string().min(1, "잘못된 형식입니다.").max(20, "잘못된 형식입니다."),
  address: z.string().min(1, "잘못된 형식입니다."),
  license: z.string().min(1, "잘못된 형식입니다."),
});

export type TypeStoreInfo = z.infer<typeof storeInfoSchema>;
