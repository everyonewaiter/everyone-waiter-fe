import * as z from "zod";

const schema = z.object({
  imgFile: z.instanceof(File).nullable(),
  imgString: z.string(),
  category: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  spicy: z.number().min(1).max(3),
  state: z.enum(["DEFAULT", "HIDE", "SOLD_OUT"]).optional(),
  label: z.enum(["BEST", "NEW", "DEFAULT", "RECOMMEND"]).optional(),
  printEnabled: z.boolean().optional(),
  requiredOptions: z.array(
    z.object({
      name: z.string(),
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
      name: z.string(),
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
  .required();

export type TypeMenuForm = z.infer<typeof menuFormSchema>;
