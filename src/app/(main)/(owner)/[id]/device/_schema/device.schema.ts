import { commonSchema } from "@/schema";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  createdAt: z.string(),
  state: z.nullable(z.enum(["ACTIVE", "INACTIVE"])),
  purpose: z.enum(["HALL", "POS", "WAITING", "TABLE"]),
  paymentType: z.enum(["POSTPAID", "PREPAID"]),
  tableNo: z.number(),
  deviceNumber: commonSchema.shape.deviceNumber,
});

export const deviceFormSchema = schema.pick({
  name: true,
  createdAt: true,
  state: true,
  purpose: true,
  paymentType: true,
  tableNo: true,
  deviceNumber: true,
});

export type TypeDeviceForm = z.infer<typeof deviceFormSchema>;
