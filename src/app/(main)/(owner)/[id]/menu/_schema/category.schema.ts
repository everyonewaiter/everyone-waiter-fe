import * as z from "zod";

const schema = z.object({
  categories: z.array(
    z.object({
      categoryId: z.string(),
      name: z
        .string()
        .min(1, "카테고리 이름을 입력해주세요.")
        .max(20, "카테고리 이름은 20자 이하여야 합니다."),
      isUpdated: z.boolean(),
      isAdded: z.boolean(),
    })
  ),
});

export const categoryFormSchema = schema.pick({
  categories: true,
});

export const categorySchema = z.object({
  categories: z.array(
    z.object({
      categoryId: z.string(),
      name: z
        .string()
        .min(1, "카테고리 이름을 입력해주세요.")
        .max(20, "카테고리 이름은 20자 이하여야 합니다."),
    })
  ),
});

export type TypeCategoryForm = z.infer<typeof categoryFormSchema>;
export type TypeCategory = z.infer<typeof categorySchema>;
