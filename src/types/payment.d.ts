interface PaymentResponse {
  APPROVALNO: string; // 승인번호
  CARDNAME: string; // 카드 종류 명
  CARDTYPE: string; // 카드 타입
  CLASSFLAG: string; // 업무 구분
  COMPANYINFO: string; // 업체 정보
  CORPRESPCODE: string; // 카드사/포인트사 응답 코드
  DCCDATA: string; // DCC 환율 조회 데이터
  ERRCODE: string; // 암호화 리더기 응답코드
  FILLER: string; // 필러
  ISSUERCODE: string; // 발급사 코드
  KSNETRESERVED: string;
  MERCHANTNUMBER: string; // 카드사/포인트사 가맹점번호
  MESSAGE1: string;
  MESSAGE2: string;
  NOTICE1: string;
  NOTICE2: string;
  POINT1: string; // 발생 포인트
  POINT2: string; // 가용 포인트
  POINT3: string; // 누적 포인트
  PURCHASECODE: string; // 매입사 코드
  PURCHASENAME: string; // 매입사명
  REMAINAMOUNT: string; // 잔액
  REQ: string;
  RES: string;
  RESERVED: string;
  RESPCODE: string; // KSNet 표준 응답 코드
  STATUS: string; // 정상 승인 / 거절
  TELEGRAMFLAG: string; // 전문구분
  TELEGRAMNO: string; // 전문 일련번호
  TERMID: string; // 단말기 번호
  TRADEFLAG: string; // 거래 구분
  TRADETIME: string; // 거래일시 (yymmddhhmmss)
  TRADETYPE: string; // 거래 형태
  TRADEUNIQUENO: string; // 거래고유번호
  WORKINGKEY: string;
  WORKINGKEYINDEX: string;
}

type OrderPaymentState = "APPROVE" | "CANCEL";
type OrderPaymentMethod = "CASH" | "CARD";
type OrderReceiptType = "NONE" | "DEDUCTION" | "PROOF";

interface OrderPayments {
  method: OrderPaymentMethod;
  amount: number;
  approvalNo: string;
  installment: string;
  cardNo: string;
  issuerName: string;
  purchaseName: string;
  merchantNo: string;
  tradeTime: string;
  tradeUniqueNo: string;
  vat: number;
  supplyAmount: number;
  cashReceiptNo: string;
  cashReceiptType: OrderReceiptType;
}

interface OrderPaymentsList extends OrderPayments {
  orderPaymentId: string;
  posTableActivityId: string;
  storeId: string;
  state: OrderPaymentState;
  cancellable: boolean;
  createdAt: string;
}

interface Revenue {
  totalOrderPrice: number;
  totalDiscountPrice: number;
  totalPaymentPrice: number;
  cashPaymentApprovePrice: number;
  cardPaymentApprovePrice: number;
  cashPaymentCancelPrice: number;
  cardPaymentCancelPrice: number;
}
