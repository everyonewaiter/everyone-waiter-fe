export const print = (type: "kitchen" | "receipt") => {
  const tableNo = 1;
  const orderNo = 11;

  window.setPosId(1);
  window.checkPrinterStatus();

  const now = new Date();
  const formatDate = now.toLocaleString();

  if (type === "kitchen") {
    window.printText(`주문번호: ${orderNo}\n`, 0, 1, true, false, false, 0, 0);
    window.printText(
      `테이블번호: ${tableNo}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      `주문시간: ${formatDate}\n\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "-----------------------------------------\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "품명             수량\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "--------------------------------------\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );

    window.printText(
      "불고기덮밥         2    \n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "  └ 곱빼기              \n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "  └ 맵기 보통          \n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "된장찌개           1    \n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "  └ 추가밥              \n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "[메모] 덜 맵게 해주세요\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );

    window.printText(
      "-----------------------------------------\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
  } else {
    window.printText(
      "\nABC Restaurant\n1234 Food St, Seoul, Korea\nTel: 02-1234-5678\n\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "--------------------------------------------\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(`영수증 번호: #12\n`, 0, 1, true, false, false, 0, 0);
    window.printText(`테이블번호: 04\n`, 0, 1, true, false, false, 0, 0);
    window.printText(
      `발행일시: ${formatDate}\n\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "--------------------------------------------\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "메뉴명           수량    단가     금액\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "--------------------------------------------\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );

    window.printText(
      "불고기덮밥         2     6,000    12,000\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "  └ 곱빼기                1,000     1,000\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText("  └ 맵기 보통\n", 0, 0, false, false, false, 0, 0);
    window.printText(
      "된장찌개           1     5,000     5,000\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "  └ 추가밥                  500       500\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );

    window.printText(
      "--------------------------------------------\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "공급가                                 18,500\n",
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      "부가세                                  1,850\n",
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      "합계                                   20,350\n",
      0,
      1,
      true,
      true,
      false,
      0,
      0
    );

    window.printText(
      "결제방법                          신용카드(신한)\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "카드번호              9400*********1234\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "결제금액                              20,350\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "할부기간                                 일시불\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "승인번호                            12345678\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "승인일시          2025-07-04 16:30:12\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
  }

  window.cutPaper(1);

  const strSubmit = window.getPosData();
  console.log("Print data:", strSubmit);
  window.requestPrint("Printer1", strSubmit, (result: unknown) =>
    console.log("Print result:", result)
  );
};
