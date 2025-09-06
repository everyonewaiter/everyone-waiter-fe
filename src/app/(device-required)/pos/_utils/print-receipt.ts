export const print = ({
  type,
  activity,
  payment,
  stores,
  successHandler,
  cashReceiptPhoneNo,
}: {
  type: "kitchen" | "cash-receipt" | "card-receipt";
  activity: PosTableActivity;
  payment?: {
    CARDNAME: string;
    FILLER: string;
    INSTALLMENT: string;
    APPROVALNO: string;
    TRADETIME: string;
  };
  stores?: PosStore;
  successHandler?: () => void;
  cashReceiptPhoneNo?: string;
}) => {
  window.setPosId(1);

  try {
    window.checkPrinterStatus();
  } catch (error) {
    // eslint-disable-next-line
    const userChoice = window.confirm(
      "프린터가 연결되어있지 않습니다. 영수증을 인쇄하지 않고 진행하시겠습니까?"
    );
    if (!userChoice) return;
  }

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

  const printKitchen = () => {
    window.printText(`주  문  서\n`, 0, 2, true, false, false, 0, 1);
    window.printText(
      `주문번호: ${activity?.posTableActivityId}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      `테이블번호: ${activity?.tableNo}\n`,
      0,
      1,
      true,
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

    activity?.orders.forEach((order) => {
      order.orderMenus.forEach((menu) => {
        window.printText(
          `${formatReceiptRow(menu.name, "", "", String(menu.quantity))}\n`,
          1,
          0,
          true,
          false,
          false,
          0,
          0
        );
        menu.orderOptionGroups.forEach((option) => {
          option.orderOptions.forEach((o) => {
            window.printText(
              `${formatReceiptRow(`└ ${option.name}`, o.name, "", "")}\n`,
              1,
              0,
              true,
              false,
              false,
              0,
              0
            );
          });
        });
      });
      window.printText(
        `[메모] ${order.memo}\n\n`,
        0,
        0,
        false,
        false,
        true,
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
    window.printText(`영  수  증\n`, 0, 2, true, false, false, 0, 1);
    window.printText(
      `${stores?.name}\n${stores?.address}\n사업자: ${stores?.license}\n전화번호: ${stores?.landline}\n`,
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
      `영수증 번호: #${activity?.posTableActivityId}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      `테이블번호: ${activity?.tableNo}\n`,
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

    activity?.orders.forEach((order) => {
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
        menu.orderOptionGroups.forEach((option) => {
          option.orderOptions.forEach((o) => {
            window.printText(
              `${formatReceiptRow(`└ ${o.name}`, "", "", o.price ? `${o.price.toLocaleString()}` : "")}\n`,
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

    const supplyAmount = Math.floor(Number(activity?.totalOrderPrice) / 1.1);
    const vatAmount = Number(activity?.totalOrderPrice) - supplyAmount;

    window.printText(
      `${formatReceiptRow("공급가", "", "", `${supplyAmount.toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
    window.printText(
      `${formatReceiptRow("부가세", "", "", `${vatAmount.toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );

    if (activity?.discount) {
      window.printText(
        `${formatReceiptRow("할인", "", "", `${activity?.discount.toLocaleString()}원`)}\n`,
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
      `${formatReceiptRow("합계", "", "", `${activity?.totalOrderPrice.toLocaleString()}원`)}\n`,
      0,
      1,
      true,
      false,
      false,
      0,
      0
    );
  };

  const printAddition = () => {
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
        `${formatAlignLeftRight("결제방법", `${payment?.CARDNAME}`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("카드번호", payment?.FILLER.trim() as string)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("결제금액", `${activity?.totalOrderPrice.toLocaleString()}원`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("할부기간", payment?.INSTALLMENT === "일시불" ? payment?.INSTALLMENT : `${payment?.INSTALLMENT}개월`)}\n`,
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
        `${formatAlignLeftRight("승인일시", payment?.TRADETIME!)}\n\n\n`,
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
        `${formatAlignLeftRight("받을 금액", `${activity?.totalOrderPrice.toLocaleString()}원`)}\n`,
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
        `${formatAlignLeftRight("결제 방법", "현금\n\n\n")}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
      window.printText(
        `${formatAlignLeftRight("현금 영수증 발급", `${cashReceiptPhoneNo}\n\n\n`)}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );

      const formatTradeTime = () => {
        const pad = (num: number) => String(num).padStart(2, "0");

        const year = String(now.getFullYear()).slice(-2);
        const month = pad(now.getMonth() + 1);
        const day = pad(now.getDate());
        const hour = pad(now.getHours());
        const minute = pad(now.getMinutes());
        const second = pad(now.getSeconds());

        return `${year}${month}${day}${hour}${minute}${second}`;
      };

      window.printText(
        `${formatAlignLeftRight("승인 일시", formatTradeTime())}\n`,
        0,
        0,
        false,
        false,
        false,
        0,
        0
      );
    }
  };

  // NOTE: 영수증 코드
  if (type === "kitchen") {
    printKitchen();
  } else {
    printReceipt();
    printAddition();
  }

  window.cutPaper(1);

  const strSubmit = window.getPosData();
  try {
    window.requestPrint("Printer1", strSubmit, () => {
      successHandler?.();
    });
  } catch (error) {
    successHandler?.();
  }
};
