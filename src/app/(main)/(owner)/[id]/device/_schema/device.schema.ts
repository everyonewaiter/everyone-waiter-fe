import { deviceNumberSchema } from "@/schema";
import { z } from "zod";

export const deviceFormSchema = z.object({
  name: z.string().min(1, { message: "기기 이름은 필수입니다." }),
  createdAt: z.string().optional(),
  state: z.enum(["ACTIVE", "INACTIVE"]).nullable().optional(),
  purpose: z.enum(["HALL", "POS", "WAITING", "TABLE"]),
  paymentType: z.enum(["POSTPAID", "PREPAID"]),
  tableNo: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 1, {
      message: "테이블 번호는 1 이상의 숫자여야 합니다.",
    }),
  deviceNumber: deviceNumberSchema,
});

export type TypeDeviceForm = z.infer<typeof deviceFormSchema>;
