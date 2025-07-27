import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { renewToken } from "@/lib/api/auth.api";
import { setupInterceptors } from "@/lib/axios/setupInterceptors";
import { getClientCookie, setClientCookie } from "@/lib/cookies/client";

// Mocks
jest.mock("@/lib/api/auth.api", () => ({
  renewToken: jest.fn(),
}));

jest.mock("@/lib/cookies/index", () => ({
  getToken: jest.fn((key: string) =>
    key === "accessToken" ? "mock-access-token" : null
  ),
  setCookie: jest.fn(),
}));

jest.mock("@/lib/cookies/client", () => ({
  getClientCookie: jest.fn((key: string) =>
    key === "refreshToken" ? "valid-refresh-token" : null
  ),
  setClientCookie: jest.fn(),
  deleteClientCookie: jest.fn(),
}));

jest.mock("@/lib/auth/secureStorage", () => ({
  getDecryptedItem: jest.fn(),
  setEncryptedItem: jest.fn(),
}));

describe("토큰 재발급 연속 요청 방지", () => {
  let instance: ReturnType<typeof axios.create>;
  let mock: MockAdapter;

  beforeEach(() => {
    instance = axios.create();
    setupInterceptors(instance);
    mock = new MockAdapter(instance);

    // 리프레시 토큰 존재
    (getClientCookie as jest.Mock).mockImplementation((key) =>
      key === "refreshToken" ? "valid-refresh-token" : null
    );

    // 토큰 재발급 응답 설정
    (renewToken as jest.Mock).mockResolvedValue({
      accessToken: "new-access-token",
    });
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  it("다수의 토큰 재설정 요청에도 renew는 한 번만 호출된다", async () => {
    // ✅ 최초 요청 3개 모두 401 Unauthorized
    mock.onGet("/test1").replyOnce(401);
    mock.onGet("/test2").replyOnce(401);
    mock.onGet("/test3").replyOnce(401);

    // ✅ 재시도 요청은 200 OK
    mock.onGet("/test1").reply(200, "ok");
    mock.onGet("/test2").reply(200, "ok");
    mock.onGet("/test3").reply(200, "ok");

    // ▶️ 동시에 API 호출
    const responses = await Promise.all([
      instance.get("/test1"),
      instance.get("/test2"),
      instance.get("/test3"),
    ]);

    // 응답 확인
    responses.forEach((res) => expect(res.data).toBe("ok"));

    // 재발급 함수는 1회만 실행되어야 함
    expect(renewToken).toHaveBeenCalledTimes(1);
    expect(renewToken).toHaveBeenCalledWith({
      refreshToken: "valid-refresh-token",
    });

    // accessToken이 cookie에 저장되었는지 확인
    expect(setClientCookie).toHaveBeenCalledWith(
      "accessToken",
      "new-access-token"
    );
  });
});
