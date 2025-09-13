import { phoneSchema, authNumberSchema } from "@/schema";
import z from "zod";

export const step1Schema = (isActive: boolean) =>
  z.object({
    phone: phoneSchema,
    authNumber: authNumberSchema(isActive),
  });

export const step2Schema = z.object({
  deviceName: z.string(),
});

export type TypeDeviceStep1Form = z.infer<ReturnType<typeof step1Schema>>;
export type TypeDeviceStep2Form = z.infer<typeof step2Schema>;
