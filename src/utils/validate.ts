export function isNumber(target: number | string | null | undefined) {
  if (target === null || target === undefined) {
    return false;
  }

  if (typeof target === "string") {
    if (target.trim().length === 0) {
      return false;
    }
  }

  return !Number.isNaN(Number(target));
}
