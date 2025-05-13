import CryptoJS from "crypto-js";

// 요청 헤더 및 시그니처 생성에 사용
// 요청 헤더와 시그니처 생성 시 동일한 timestamp 사용
// 5분 경과 시 사용 불가 (요청할 때마다 생성 권장)
const timestamp = Date.now().toString();

const makeSignature = ({
  deviceId,
  purpose,
  name,
  secretKey, // 기기 생성 시 응답 본문으로 전달된 비밀키
}: IDevice & { secretKey: string }) => {
  const method = "GET";
  const uri = "/v1/devices";

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(`${method} ${uri}`);
  hmac.update("\n");
  hmac.update(`${deviceId} ${purpose} ${name}`);
  hmac.update("\n");
  hmac.update(timestamp);
  const hash = hmac.finalize();
  return hash.toString(CryptoJS.enc.Base64);
};

export default makeSignature;
