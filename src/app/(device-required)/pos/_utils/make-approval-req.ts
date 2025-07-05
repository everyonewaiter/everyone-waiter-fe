export default function makeKSCATApprovalREQ({
  amount,
  tax,
  nonTax,
  installment,
  type,
}: {
  amount: number;
  tax: number;
  nonTax: number;
  installment: string; // "00", "02", ...
  type: "0" | "1"; // 1 승인, 0 취소
}) {
  function fillZero(num: number) {
    return "0".repeat(num);
  }

  function fillBlank(num: number) {
    return " ".repeat(num);
  }

  let resultText = "";

  // NOTE: STX
  resultText += String.fromCharCode(2);
  // NOTE: 거래 구분 (신용IC: IC, 현금: HK)
  resultText += "IC";
  // NOTE: 업무 구분 (승인취소: 01)
  resultText += "01";
  // NOTE: 전무 구분 (승인조회 0200, 취소 0420)
  resultText += type === "1" ? "0200" : "0420";
  // NOTE: 거래 형태 (일반 N)
  resultText += "N";
  // NOTE: 단말이 번호 (10자)
  resultText += "DPTOTEST03";
  // NOTE: 업체 정보
  resultText += fillBlank(4);
  // NOTE: 전문일련번호 (12자)
  resultText += fillZero(12);

  // NOTE: 포스 엔드티 모드
  resultText += fillBlank(1);
  // NOTE: 거래 고유 번호
  resultText += fillBlank(20);
  // NOTE: 암호화하지 않은 카드 번호
  resultText += fillBlank(20);
  // NOTE: 암호화 여부
  resultText += fillBlank(1);
  // NOTE: SW 모델번호
  resultText += fillBlank(16);
  // NOTE: CAT or Reader 모델 번호
  // resultText += "KSR02U";
  resultText += fillBlank(16);
  // NOTE: 암호화 정보
  resultText += fillBlank(40);
  // NOTE: Track II
  resultText += fillBlank(37);
  // NOTE: FS
  resultText += String.fromCharCode(28);

  // NOTE: 할부개월 (00 ~ 12)
  resultText += installment.padStart(2, "0");
  // NOTE: 총 금액
  resultText += String(amount).padStart(12, "0");
  // NOTE: 봉사료
  resultText += fillZero(12);
  // NOTE: 세금
  resultText += String(tax).padStart(12, "0");
  // NOTE: 공급금액
  resultText += String(nonTax).padStart(12, "0");
  // NOTE: 면세금액
  resultText += fillZero(12);

  // NOTE: Working Key Index
  resultText += fillBlank(2);
  // NOTE: 비밀번호
  resultText += fillBlank(16);
  // NOTE: 원거래승인번호
  resultText += fillBlank(12);
  // NOTE: 원거래승인일자 (6자)
  resultText += `${new Date().toISOString().split("T")[0].replaceAll("-", "")}`;
  for (let i = 0; i < 163; i += 1) {
    resultText += " ";
  } // NOTE: 사용자정보~DCC

  // NOTE: 전자서명 유뮤
  resultText += amount < 50000 ? "X" : "T";
  // resultText += "X";
  // NOTE: 전자서명 암호화
  // resultText += fillBlank(2);
  // NOTE: 전자 서명 길이
  // resultText += "    ";
  // NOTE: ETX
  resultText += String.fromCharCode(3);
  // NOTE: CR
  resultText += String.fromCharCode(13);

  const header = `AP${resultText.length.toString().padStart(4, "0")}`;
  const body = resultText;

  return `${header}${body}`;
}
