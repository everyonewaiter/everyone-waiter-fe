import { commonSchema } from "@/schema";
import z from "zod";

const schema = z.object({
  phone: commonSchema.shape.phone,
  authNumber: commonSchema.shape.authNumber,
  deviceName: z.string(),
  deviceNumber: commonSchema.shape.deviceNumber,
});

export const step1Schema = schema.pick({
  phone: true,
  authNumber: true,
});

export const step2Schema = schema.pick({
  deviceName: true,
  deviceNumber: true,
});

export type TypeDeviceStep1Form = z.infer<typeof step1Schema>;
export type TypeDeviceStep2Form = z.infer<typeof step2Schema>;
