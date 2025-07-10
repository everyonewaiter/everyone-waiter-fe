export default function useMakeDeviceName() {
  const now = new Date();
  return `POS-${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now.getHours().toString().padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}${now.getMilliseconds().toString().padStart(3, "0")}`;
}
