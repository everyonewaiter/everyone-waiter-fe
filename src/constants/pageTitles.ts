// 권한별 메뉴 구성
const PAGE_TITLES: Record<string, Record<string, string>> = {
  OWNER: {
    init: "매장 등록 신청 현황",
    store: "매장 정보",
    menu: "메뉴 관리",
    device: "기기 관리",
    settings: "매장 설정",
  },
  ADMIN: {
    users: "회원 관리",
    stores: "매장 등록 승인",
  },
};

export default PAGE_TITLES;
