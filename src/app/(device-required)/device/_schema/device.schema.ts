import { phoneSchema, authNumberSchema } from "@/schema";
import z from "zod";

const schema = z.object({
  phone: phoneSchema,
  authNumber: authNumberSchema,
  deviceName: z.string(),
});

export const step1Schema = schema.pick({
  phone: true,
  authNumber: true,
});

export const step2Schema = schema.pick({
  deviceName: true,
});

export type TypeDeviceStep1Form = z.infer<typeof step1Schema>;
export type TypeDeviceStep2Form = z.infer<typeof step2Schema>;
