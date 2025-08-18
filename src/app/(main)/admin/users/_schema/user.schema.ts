import { emailSchema, phoneSchema } from "@/schema";
import { z } from "zod";

export const userSearchSchema = z.object({
  searchWord: z.string(),
  active: z.object({
    permission: z.enum(["전체", "사장님", "사용자", "관리자"]).nullable(),
    subscription: z.enum(["전체", "구독", "미구독", "구독철회"]).nullable(),
    storeAccepted: z.enum(["전체", "Y", "N"]).nullable(),
    status: z.enum(["전체", "활성화", "비활성화"]).nullable(),
  }),
});

export const userSchema = z.object({
  email: emailSchema,
  permission: z.custom<AccountPermission>(),
  phoneNumber: phoneSchema,
  state: z.enum(["ACTIVE", "INACTIVE"]),
});

export type TypeUserSearchForm = z.infer<typeof userSearchSchema>;
export type TypeUserForm = z.infer<typeof userSchema>;
