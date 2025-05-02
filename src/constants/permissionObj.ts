export const PermissionObj: Record<TPermission, string> = {
  ADMIN: "관리자",
  USER: "사용자",
  OWNER: "사장님",
};

export const stateObj: Record<TStatus, string> = {
  ACTIVE: "활성화",
  INACTIVE: "비활성화",
  DELETE: "탈퇴함",
};

export const registerStatusObj: Record<RegisterStatus, string> = {
  APPLY: "접수",
  REAPPLY: "재접수",
  APPROVE: "승인",
  REJECT: "반려",
};
