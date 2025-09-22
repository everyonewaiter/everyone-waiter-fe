interface PaperConfig {
  totalWidth: number;
  nameWidth: number;
  qtyWidth: number;
  priceWidth: number;
  totalPriceWidth: number;
}

const PAPER_CONFIGS: PaperConfig = {
  totalWidth: 42,
  nameWidth: 19,
  qtyWidth: 5,
  priceWidth: 9,
  totalPriceWidth: 9,
};

function getDisplayWidth(str: string) {
  if (!str) return 0;
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
  const config = PAPER_CONFIGS;

  return (
    padString(name, config.nameWidth, "left") +
    padString(qty, config.qtyWidth, "right") +
    padString(price, config.priceWidth, "right") +
    padString(total, config.totalPriceWidth, "right")
  );
}

const countUnits = (text: string | null | undefined) => {
  const safeText = text || "";
  return safeText.split("").reduce((totalUnits, char) => {
    if (/[가-힣]/.test(char)) {
      return totalUnits + 2;
    }
    return totalUnits + 1;
  }, 0);
};

function formatAlignLeftRight(
  left: string,
  right: string,
  fontSizeX: number = 0
) {
  const maxWidth = {
    0: 42, // 42 ÷ 2
    1: 21, // 42 ÷ 4
  };

  const width = maxWidth[fontSizeX as keyof typeof maxWidth];
  const minSpacing = fontSizeX === 0 ? 8 : 4;
  const rightLength = countUnits(right);
  const maxLeftLength = width - rightLength - minSpacing;

  const leftLength = countUnits(left);

  if (leftLength > maxLeftLength) {
    let cutIndex = 0;
    for (let i = 0; i < left.length; i += 1) {
      if (countUnits(left.substring(0, i + 1)) > maxLeftLength) {
        cutIndex = i;
        break;
      }
      cutIndex = i + 1;
    }

    const firstLine = left.substring(0, cutIndex);
    const remainingLeft = left.substring(cutIndex);
    return `${firstLine}${" ".repeat(minSpacing)}${right}\n${remainingLeft}`;
  }

  const spaceCount = Math.max(minSpacing, width - leftLength - rightLength);

  return `${left}${" ".repeat(spaceCount)}${right}`;
}

function printDivider() {
  return window.printText(
    `${"-".repeat(PAPER_CONFIGS.totalWidth)}\n`,
    0,
    0,
    false,
    false,
    false,
    0,
    0
  );
}

const checkPrinter = (
  printerName: string,
  callback: (exists: boolean) => void
) => {
  const testReq = new XMLHttpRequest();
  testReq.open(
    "GET",
    `http://127.0.0.1:18080/WebPrintSDK/${printerName}/status`,
    true
  );
  testReq.onreadystatechange = () => {
    if (testReq.readyState === 4) {
      callback(testReq.status === 200);
    }
  };
  testReq.send();
};

const printBaseRow = (text: string, value: string) => {
  const INIT = 42;
  const spacing = " ".repeat(INIT - countUnits(text) - countUnits(value));
  return `${text + spacing + value}\n`;
};

const formatted = (initialDate?: Date) => {
  const now = initialDate || new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const period = hours >= 12 ? "오후" : "오전";
  let displayHours: number;
  if (hours > 12) {
    displayHours = hours - 12;
  } else if (hours === 0) {
    displayHours = 12;
  } else {
    displayHours = hours;
  }

  const time = `${displayHours}:${minutes.toString().padStart(2, "0")}`;

  return `${year}. ${month}. ${day}. ${period} ${time}`;
};

export {
  formatAlignLeftRight,
  formatReceiptRow,
  PAPER_CONFIGS,
  printDivider,
  checkPrinter,
  countUnits,
  printBaseRow,
  formatted,
};
