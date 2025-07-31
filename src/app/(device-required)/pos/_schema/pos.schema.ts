import { phoneSchema } from "@/schema";
import z from "zod";

const schema = z.object({
  discount: z.nullable(z.number()),
  result: z.nullable(z.number()),
  discountType: z.enum(["fixed", "percent"]),
  receiptType: z.enum(["개인소득공제용", "신청안함", "사업자증빙용"]),
  phoneNumber: phoneSchema,
  monthlyPlan: z
    .string()
    .refine((val) => val === "" || /^(0[2-9]|1[0-2]|일시불)$/.test(val), {
      message: "",
    }),
});

export const discountSchema = schema.pick({
  discount: true,
  result: true,
  discountType: true,
});

export const paySchema = schema.pick({
  receiptType: true,
  phoneNumber: true,
  monthlyPlan: true,
});

export type TypeDiscountForm = z.infer<typeof discountSchema>;
export type TypePayForm = z.infer<typeof paySchema>;
