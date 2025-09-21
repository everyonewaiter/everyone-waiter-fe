export const permissionTranslate: Record<AccountPermission, string> = {
  ADMIN: "관리자",
  USER: "사용자",
  OWNER: "사장님",
} as const;

export const stateTranslate: Record<Status, string> = {
  ACTIVE: "활성화",
  INACTIVE: "비활성화",
} as const;

export const registerStateTranslate: Record<RegisterStatus, string> = {
  APPLY: "접수",
  REAPPLY: "재접수",
  APPROVE: "승인",
  REJECT: "반려",
} as const;

export const paymentTypeTranslate = {
  PREPAID: "선결제",
  POSTPAID: "후결제",
  null: "대기",
} as const;

export const deviceTranslate = {
  POS: "POS",
  TABLE: "테이블",
  HALL: "홀",
  WAITING: "웨이팅",
} as const;

export const menuLabelTranslate = {
  DEFAULT: "기본",
  BEST: "Best",
  RECOMMEND: "추천",
  NEW: "New",
};

export const menuStateTranslate = {
  DEFAULT: "기본",
  HIDE: "숨김",
  SOLD_OUT: "품절",
};
