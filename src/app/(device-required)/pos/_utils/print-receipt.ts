export const print = (
  type: "kitchen" | "cash-receipt" | "card-receipt",
  activity: PosTableActivity
) => {
  const tableNo = 1;
  const orderNo = 11;

  window.setPosId(1);
  window.checkPrinterStatus();

  const now = new Date();
  const formatDate = now.toLocaleString();

  function formatReceiptRow(
    name: string,
    qty: string,
    price: string,
    total: string
  ) {
    const nameWidth = 16;
    const qtyWidth = 6;
    const priceWidth = 10;
    const totalWidth = 10;

    const centerAlign = (text: string, width: number) => {
      const space = width - text.length;
      const left = Math.floor(space / 2);
      const right = space - left;
      return " ".repeat(left) + text + " ".repeat(right);
    };

    return (
      name.padEnd(nameWidth, " ") +
      centerAlign(qty, qtyWidth) +
      centerAlign(price, priceWidth) +
      total.padStart(totalWidth, " ")
    );
  }

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
      `${formatReceiptRow("품명", "", "", "수량")}\n`,
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

    activity.orders.forEach((order) => {
      order.orderMenus.forEach((menu) => {
        window.printText(
          `${formatReceiptRow(menu.name, "", "", String(menu.quantity))}\n`,
          0,
          0,
          false,
          false,
          false,
          0,
          0
        );
        menu.orderOptionGroups.forEach((option: OrderOptionGroups) => {
          option.orderOptions.forEach((o) => {
            window.printText(
              `${formatReceiptRow(`└ ${option.name}`, o.name, "", "")}\n`,
              0,
              0,
              false,
              false,
              false,
              0,
              0
            );
          });
        });
      });
      window.printText(
        `[메모] ${order.memo}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
    });

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
  } else {
    window.printText(
      `${activity.name}\n1234 Food St, Seoul, Korea\nTel: 02-1234-5678\n\n`,
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
    window.printText(
      `테이블번호: ${activity.tableNo}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
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
      `${formatReceiptRow("메뉴명", "수량", "단가", "금액")}\n`,
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
      `${formatReceiptRow("불고기덮밥", "2", "6,000", "12,000")}\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatReceiptRow("└ 곱빼기", "", "1,000", "1,000")}\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatReceiptRow("└ 맵기 보통", "", "", "")}\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatReceiptRow("된장찌개", "1", "5,000", "5,000")}\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatReceiptRow("└ 밥 추가", "", "500", "500")}\n`,
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
      `${formatReceiptRow("공급가", "", "", "16,650")}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatReceiptRow("부가세", "", "", "1,850")}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    // NOTE: discount가 있으면
    window.printText(
      `${formatReceiptRow("할인", "", "", "1000")}\n`,
      0,
      1,
      true,
      true,
      false,
      0,
      0
    );
    window.printText(
      `${formatReceiptRow("합계", "", "", "17,500")}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );

    if (type === "card-receipt") {
      window.printText(
        `${formatReceiptRow("결제방법", "", "", "신용카드(신한)")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatReceiptRow("카드번호", "", "", "9400*********1234")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatReceiptRow("결제금액", "", "", "20,350")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatReceiptRow("할부기간", "", "", "일시불")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatReceiptRow("승인번호", "", "", "12345678")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatReceiptRow("승인일시", "", "", "2025-07-04 16:30:12")}\n`,
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
        `${formatReceiptRow("받을 금액", "", "", "17,500")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatReceiptRow("받은 금액", "", "", "20,000")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatReceiptRow("거스름돈", "", "", "2,500")}\n`,
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
        `${formatReceiptRow("결제방법", "", "", "현금")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatReceiptRow("승인번호", "", "", "12345678")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatReceiptRow("승인일시", "", "", "2025-07-04 16:30:12")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
    }
  }

  window.cutPaper(1);

  const strSubmit = window.getPosData();
  console.log("Print data:", strSubmit);
  window.requestPrint("BIXOLON SRP-330II", strSubmit, (result: unknown) =>
    console.log("Print result:", result)
  );
};
