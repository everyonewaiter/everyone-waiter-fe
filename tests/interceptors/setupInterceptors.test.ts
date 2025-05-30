import { setupInterceptors } from "@/lib/axios/interceptors";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getToken, setCookie } from "@/lib/cookies";
import { renewToken } from "@/lib/api/auth.api";

jest.mock("react-secure-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

jest.mock("@/lib/cookies", () => ({
  getToken: jest.fn(),
  setCookie: jest.fn(),
}));

jest.mock("@/lib/api/auth.api", () => ({
  renewToken: jest.fn(),
}));

describe("토큰 재발급 연속 요청 방지", () => {
  let instance: ReturnType<typeof axios.create>;
  let mock: MockAdapter;

  beforeEach(() => {
    instance = axios.create();
    setupInterceptors(instance);
    mock = new MockAdapter(instance);

    // NOTE - 리프레시 토큰 값
    (getToken as jest.Mock).mockImplementation((key) =>
      key === "refreshToken" ? "valid-refresh-token" : null
    );

    // NOTE - 토큰 값
    (renewToken as jest.Mock).mockResolvedValue({
      accessToken: "new-access-token",
    });
  });

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  it("다수의 토큰 재설정 요청에도 renew는 한 번만 호출된다", async () => {
    // NOTE - 3번 연속으로 API 요청 및 전부 401
    mock.onGet("/test1").replyOnce(401);
    mock.onGet("/test2").replyOnce(401);
    mock.onGet("/test3").replyOnce(401);

    // NOTE - 재요청은 200
    mock.onGet("/test1").reply(200, "ok");
    mock.onGet("/test2").reply(200, "ok");
    mock.onGet("/test3").reply(200, "ok");

    const responses = await Promise.all([
      instance.get("/test1"),
      instance.get("/test2"),
      instance.get("/test3"),
    ]);

    // NOTE - 모든 응답이 성공했는지 확인
    responses.forEach((res) => expect(res.data).toBe("ok"));

    // NOTE - 토큰 갱신이 한 번만 호출되었는지 확인
    expect(renewToken).toHaveBeenCalledTimes(1);
    expect(renewToken).toHaveBeenCalledWith({
      refreshToken: "valid-refresh-token",
    });

    // NOTE - 새로운 토큰이 쿠키에 저장되었는지 확인
    expect(setCookie).toHaveBeenCalledWith("accessToken", "new-access-token");
  });
});
