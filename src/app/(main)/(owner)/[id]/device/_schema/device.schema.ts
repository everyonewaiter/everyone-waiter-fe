import { deviceNumberSchema } from "@/schema";
import { z } from "zod";

export const deviceFormSchema = z.object({
  name: z.string().min(1, "기기 이름은 필수입니다."),
  createdAt: z.string().optional(),
  state: z.enum(["ACTIVE", "INACTIVE"]).nullable().optional(),
  purpose: z.enum(["HALL", "POS", "WAITING", "TABLE"]),
  paymentType: z.enum(["POSTPAID", "PREPAID"]),
  tableNo: z.coerce.number(),
  deviceNumber: deviceNumberSchema,
});

export type TypeDeviceForm = z.infer<typeof deviceFormSchema>;
