import z from "zod";

const schema = z.object({
  phone: z
    .string()
    .refine((val) => val === "" || /^01[016789]-\d{3,4}-\d{4}$/.test(val), {
      message: "유효하지 않은 휴대폰 번호 형식입니다.",
    }),
  authNumber: z.string().min(6).max(6),
  deviceName: z.string(),
  deviceNumber: z.string().min(10).max(10),
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
