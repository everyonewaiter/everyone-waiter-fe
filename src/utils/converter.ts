import { isNumber } from "@/utils/validate";

export function convertToTableName(
  tableNo: number | string | null | undefined
) {
  if (tableNo === null || tableNo === undefined || !isNumber(tableNo)) {
    return "UNKNOWN";
  }

  if (Number(tableNo) > 10000) {
    return `추가-${Number(tableNo) - 10000}`;
  }

  return `T-${tableNo}`;
}
