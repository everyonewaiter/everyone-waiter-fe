import { commonSchema } from "@/schema";
import { z } from "zod";

export const settingsSchema = z.object({
  optionText: z.string().min(1, "값이 입력되지 않았습니다."),
  deviceNumber: commonSchema.shape.deviceNumber,
});

export type TypeSettingsForm = z.infer<typeof settingsSchema>;
