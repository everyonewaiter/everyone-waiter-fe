import { z } from "zod";
import { commonSchema } from ".";

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

export const storeSchema = z.object({
  name: z.string().min(1, "잘못된 형식입니다.").max(20, "잘못된 형식입니다."),
  ceoName: z
    .string()
    .min(1, "잘못된 형식입니다.")
    .regex(/^[a-zA-Z가-힣]+$/, "한글 또는 영문만 가능합니다."),
  address: z.string().min(1, "잘못된 형식입니다."),
  landline: commonSchema.shape.phone,
  license: z.string().min(1, "잘못된 형식입니다."),
  reason: z.string().min(1, "잘못된 형식입니다."),
  image: z.union([fileSchema, z.string(), z.null()]),
  origins: z.array(
    z.object({
      item: z.string().min(1).max(10),
      origin: z.string().min(1).max(10),
    })
  ),
  createdAt: z.string(),
});

export const storeInfoSchema = storeSchema.pick({
  name: true,
  address: true,
  license: true,
  origins: true,
});

export const CategorySchema = storeSchema.pick({
  name: true,
});

export const addStoreSchema = storeSchema.pick({
  name: true,
  ceoName: true,
  address: true,
  landline: true,
  license: true,
  image: true,
});

export type TypeStore = z.infer<typeof storeSchema>;
export type TypeCategory = z.infer<typeof CategorySchema>;
export type TypeStoreInfo = z.infer<typeof storeInfoSchema>;
export type TypeAddStoreForm = z.infer<typeof addStoreSchema>;
