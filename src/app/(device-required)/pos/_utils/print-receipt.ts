export const print = async ({
  type,
  activity,
  storeName,
  payment,
  successHandler,
}: {
  type: "kitchen" | "cash-receipt" | "card-receipt";
  activity: PosTableActivity;
  storeName: string;
  payment?: PaymentResponse & { installment: string };
  successHandler?: () => void;
}) => {
  const tableNo = 1;
  const orderNo = 11;

  window.setPosId(1);
  window.checkPrinterStatus();

  const now = new Date();
  const formatDate = now.toLocaleString();

  function getDisplayWidth(str: string) {
    return str
      .split("")
      .reduce((sum, char) => sum + (char.charCodeAt(0) > 255 ? 2 : 1), 0);
  }

  function padString(
    str: string,
    width: number,
    align: "left" | "right" | "center"
  ) {
    const displayWidth = getDisplayWidth(str);
    const padding = width - displayWidth;

    if (padding <= 0) return str;

    if (align === "left") return str + " ".repeat(padding);
    if (align === "right") return " ".repeat(padding) + str;
    const left = Math.floor(padding / 2);
    const right = padding - left;
    return " ".repeat(left) + str + " ".repeat(right);
  }

  function formatReceiptRow(
    name: string,
    qty: string,
    price: string,
    total: string
  ) {
    const nameWidth = 19;
    const qtyWidth = 5;
    const priceWidth = 9;
    const totalWidth = 9;

    return (
      padString(name, nameWidth, "left") +
      padString(qty, qtyWidth, "right") +
      padString(price, priceWidth, "right") +
      padString(total, totalWidth, "right")
    );
  }

  function formatAlignLeftRight(left: string, right: string, totalWidth = 42) {
    const leftWidth = getDisplayWidth(left);
    const rightWidth = getDisplayWidth(right);
    const spacing = totalWidth - leftWidth - rightWidth;

    if (spacing <= 0) return left + right;

    return left + " ".repeat(spacing) + right;
  }

  async function printSvgAsBitmap(svgUrl: string) {
    const res = await fetch(svgUrl);
    const svgText = await res.text();

    const blob = new Blob([svgText], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);

        const base64 = canvas.toDataURL("image/png");
        window.printBitmap(base64, 300, 1, 0); // 중간 정렬
        resolve();
      };
      img.src = url;
    });
  }

  const printKitchen = () => {
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
      `주문시간: ${formatDate}\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "------------------------------------------\n",
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
      "------------------------------------------\n",
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
      "------------------------------------------\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
  };

  const printReceipt = () => {
    window.printText(
      `${storeName}\n1234 Food St, Seoul, Korea\nTel: 02-1234-5678\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "------------------------------------------\n",
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
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      `발행일시: ${formatDate}\n`,
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      "------------------------------------------\n",
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
      "------------------------------------------\n",
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
          `${formatReceiptRow(menu.name, String(menu.quantity), `${menu.price.toLocaleString()}`, `${(menu.price * menu.quantity).toLocaleString()}`)}\n`,
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
              `${formatReceiptRow(`└ ${option.name} ${o.name}`, "", "", o.price ? `${o.price.toLocaleString()}` : "")}\n`,
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
    });

    window.printText(
      "------------------------------------------\n",
      0,
      0,
      false,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatReceiptRow("공급가", "", "", `${(activity.totalOrderPrice * 0.9).toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatReceiptRow("부가세", "", "", `${(activity.totalOrderPrice * 0.1).toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );

    if (activity.discount) {
      window.printText(
        `${formatReceiptRow("할인", "", "", `${activity.discount.toLocaleString()}원`)}\n`,
        0,
        1,
        true,
        false,
        false,
        0,
        0
      );
    }

    window.printText(
      `${formatReceiptRow("합계", "", "", `${activity.totalOrderPrice.toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
  };

  // eslint-disable-next-line no-console
  console.log(payment);

  const printAddition = async () => {
    if (type === "card-receipt") {
      window.printText(
        "------------------------------------------\n",
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("결제방법", `${payment?.CARDNAME}(${payment?.PURCHASENAME})`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("카드번호", payment?.FILLER as string)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("결제금액", `${activity.totalOrderPrice.toLocaleString()}원`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("할부기간", payment?.installment === "일시불" ? payment?.installment : `${payment?.installment}개월`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("승인번호", payment?.APPROVALNO as string)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("승인일시", payment?.TRADETIME as string)}\n\n\n`,
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
        "------------------------------------------\n",
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("받을 금액", `${activity.totalOrderPrice.toLocaleString()}원`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("받은 금액", "0원")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("거스름돈", "0원")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        "------------------------------------------\n",
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("결제방법", "현금\n\n\n")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
    }
    await printSvgAsBitmap("/logo/logo-text-light.svg");
    window.printText("\n\n\n", 0, 0, false, false, false, 0, 0);
  };

  // NOTE: 영수증 코드
  if (type === "kitchen") {
    printKitchen();
  } else {
    printReceipt();
    await printAddition();
  }

  window.cutPaper(1);

  const strSubmit = window.getPosData();
  window.requestPrint("Printer1", strSubmit, (result: unknown) => {
    // eslint-disable-next-line no-console
    console.log(result);
    if ((result as string).endsWith("success")) {
      successHandler?.();
    }
  });
};
