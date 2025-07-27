import { z } from "zod";

export const userSchema = z.object({
  searchWord: z.string(),
  active: z.object({
    permission: z.enum(["전체", "사장님", "사용자", "관리자"]).nullable(),
    subscription: z.enum(["전체", "구독", "미구독", "구독철회"]).nullable(),
    storeAccepted: z.enum(["전체", "Y", "N"]).nullable(),
    status: z.enum(["전체", "활성화", "비활성화"]).nullable(),
  }),
});

export type TypeUserForm = z.infer<typeof userSchema>;
