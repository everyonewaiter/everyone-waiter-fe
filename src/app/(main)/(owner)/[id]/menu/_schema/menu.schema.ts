import * as z from "zod";

const schema = z.object({
  menuId: z.string().optional(),
  imgFile: z.any(),
  imgString: z.string().min(1, { message: "이미지를 등록해주세요." }),
  image: z.string(),
  category: z.string(),
  name: z.string().min(1, { message: "메뉴명을 입력해주세요." }),
  description: z.string().optional(),
  price: z.string({ message: "가격을 입력해주세요." }).regex(/^[0-9,]+$/, {
    message: "가격은 숫자와 콤마만 입력할 수 있습니다.",
  }),
  spicy: z.number().min(1).max(3).nullable(),
  state: z.enum(["DEFAULT", "HIDE", "SOLD_OUT"]).optional(),
  label: z.enum(["BEST", "NEW", "DEFAULT", "RECOMMEND"]).optional(),
  printEnabled: z.boolean(),
  requiredOptions: z.array(
    z.object({
      name: z.string().optional(),
      printEnabled: z.boolean().default(true).optional(),
      menuOptions: z.array(
        z.object({
          name: z.string(),
          price: z.number(),
        })
      ),
    })
  ),
  optionalOptions: z.array(
    z.object({
      name: z.string().optional(),
      printEnabled: z.boolean().default(true).optional(),
      menuOptions: z.array(
        z.object({
          name: z.string(),
          price: z.number(),
        })
      ),
    })
  ),
});

export const menuFormSchema = schema
  .pick({
    imgFile: true,
    imgString: true,
    category: true,
    name: true,
    description: true,
    price: true,
    spicy: true,
    state: true,
    label: true,
    printEnabled: true,
    requiredOptions: true,
    optionalOptions: true,
  })
  .required()
  .partial({ imgFile: true });

export const menuListSchema = z.object({
  menus: z.array(
    schema.pick({
      menuId: true,
      category: true,
      name: true,
      description: true,
      price: true,
      spicy: true,
      state: true,
      label: true,
      image: true,
    })
  ),
});

export type TypeMenuForm = z.infer<typeof menuFormSchema>;
export type TypeMenuList = z.infer<typeof menuListSchema>;
