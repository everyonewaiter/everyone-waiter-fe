import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { setupInterceptors } from "@/lib/axios/setupInterceptors";

// 쿠키 관련 모킹
jest.mock("@/lib/cookies/index", () => ({
  getToken: jest.fn((key: string) =>
    key === "accessToken" ? "mock-access-token" : null
  ),
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

describe("토큰 재발급 연속 요청 방지", () => {
  let instance: ReturnType<typeof axios.create>;
  let apiMock: MockAdapter;
  let refreshMock: MockAdapter;

  beforeEach(() => {
    instance = axios.create();
    setupInterceptors(instance);
    apiMock = new MockAdapter(instance);

    refreshMock = new MockAdapter(axios);
    refreshMock.onPost("/api/refresh").reply(200, {
      accessToken: "new-access-token",
    });

    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "accessToken=mock-access-token",
    });
  });

  afterEach(() => {
    apiMock.reset();
    refreshMock.reset();
    jest.clearAllMocks();
  });

  it("다수의 토큰 재설정 요청에도 /api/refresh는 한 번만 호출된다", async () => {
    // 1️⃣ 최초 요청 3개 모두 401 응답
    apiMock.onGet("/test1").replyOnce(401);
    apiMock.onGet("/test2").replyOnce(401);
    apiMock.onGet("/test3").replyOnce(401);

    // 2️⃣ 재요청은 200 OK로 응답
    apiMock.onGet("/test1").reply(200, "ok");
    apiMock.onGet("/test2").reply(200, "ok");
    apiMock.onGet("/test3").reply(200, "ok");

    // ▶️ 동시에 API 호출
    const responses = await Promise.all([
      instance.get("/test1"),
      instance.get("/test2"),
      instance.get("/test3"),
    ]);

    // 3️⃣ 응답 데이터 확인
    responses.forEach((res) => expect(res.data).toBe("ok"));

    // 4️⃣ 재발급 요청은 1회만 발생해야 함
    expect(refreshMock.history.post.length).toBe(1);

    // 5️⃣ Authorization 헤더에 새로운 토큰이 들어갔는지 확인
    refreshMock.history.post.forEach((req) => {
      expect(req.url).toBe("/api/refresh");
    });
  });
});
