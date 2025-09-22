import { z } from "zod";
import { imageSchema, licenseSchema, phoneSchema } from ".";

export const storeSchema = z.object({
  name: z
    .string()
    .min(1, "상호명을 입력해주세요.")
    .max(20, "20자까지 입력할 수 있습니다."),
  ceoName: z
    .string()
    .min(1, "대표자명을 입력해주세요")
    .regex(/^[a-zA-Z가-힣]+$/, "한글 또는 영문만 가능합니다."),
  address: z.string().min(1, "소재지를 선택해주세요."),
  detailAddress: z.string().min(1, "상세 주소를 입력해주세요."),
  landline: phoneSchema,
  license: licenseSchema,
  reason: z.string().min(1, "매장 전화번호를 입력해주세요."),
  image: imageSchema,
  origins: z.array(
    z.object({
      item: z.string().min(1).max(10),
      origin: z.string().min(1).max(10),
    })
  ),
  createdAt: z.string(),
});

export const registrationSchema = storeSchema.pick({
  name: true,
  ceoName: true,
  address: true,
  license: true,
  landline: true,
  image: true,
});

export const storeInfoSchema = storeSchema.pick({
  name: true,
  address: true,
  license: true,
  landline: true,
  origins: true,
});

export const CategorySchema = storeSchema.pick({
  name: true,
});

export const addStoreSchema = storeSchema
  .pick({
    name: true,
    ceoName: true,
    address: true,
    detailAddress: true,
    landline: true,
    license: true,
    image: true,
  })
  .superRefine((data, ctx) => {
    if (!data.image) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["image"],
        message: "이미지를 업로드해주세요.",
      });
    }
  });

export type TypeRegistrationForm = z.infer<typeof registrationSchema>;
export type TypeStore = z.infer<typeof storeSchema>;
export type TypeCategory = z.infer<typeof CategorySchema>;
export type TypeStoreInfo = z.infer<typeof storeInfoSchema>;
export type TypeAddStoreForm = z.infer<typeof addStoreSchema>;
