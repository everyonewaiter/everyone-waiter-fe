import { deviceNumberSchema as deviceSchema } from "@/schema";
import { z } from "zod";

export const schema = z.object({
  optionText: z.string().min(1, "값이 입력되지 않았습니다."),
  deviceNumber: deviceSchema,
});

export const deviceNumberSchema = schema.pick({
  deviceNumber: true,
});

export const optionSchema = schema.pick({
  optionText: true,
});

export type TypeSettingsDeviceForm = z.infer<typeof deviceNumberSchema>;
export type TypeSettingsOptionForm = z.infer<typeof optionSchema>;
