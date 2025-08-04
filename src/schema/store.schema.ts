import { z } from "zod";
import { commonSchema } from ".";

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
  image: z.union([
    z
      .instanceof(File)
      .refine(
        (file) =>
          ["image/jpeg", "image/png", "application/pdf"].includes(file.type) ||
          /\.(jpe?g|png|pdf)$/i.test(file.name),
        {
          message: "jpg, png, pdf만 업로드할 수 있습니다.",
        }
      ),
    z.string(),
    z.null(),
  ]),
  createdAt: z.string(),
});

export const storeInfoSchema = storeSchema.pick({
  name: true,
  address: true,
  license: true,
});

export const CategorySchema = storeSchema.pick({
  name: true,
});

export type TypeStore = z.infer<typeof storeSchema>;
export type TypeCategory = z.infer<typeof CategorySchema>;
export type TypeStoreInfo = z.infer<typeof storeInfoSchema>;
