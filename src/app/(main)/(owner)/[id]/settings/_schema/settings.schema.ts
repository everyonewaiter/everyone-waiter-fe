import { deviceNumberSchema } from "@/schema";
import { z } from "zod";

export const settingsSchema = z.object({
  optionText: z.string().min(1, "값이 입력되지 않았습니다."),
  deviceNumber: deviceNumberSchema,
});

export type TypeSettingsForm = z.infer<typeof settingsSchema>;
