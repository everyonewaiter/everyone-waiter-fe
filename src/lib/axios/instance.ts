/* eslint-disable no-console */
/* eslint-disable no-alert */
import axios from "axios";

import { deleteCookie, getToken, setCookie } from "../cookies";
import { renewToken } from "../api/auth.api";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// NOTE - 로그인/회원가입 등 토큰이 필요 없는 instance
export const authInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

// NOTE - 요청 인터셉터(요청 전달 전 작업 수행)
instance.interceptors.request.use(
  async (config) => {
    const token = await getToken("accessToken");
    // NOTE - 토큰이 있으면 모든 요청에 토큰 추가
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // 요청 오류가 있는 작업 수행
  (error) => Promise.reject(error)
);

// NOTE - 응답 인터셉터
instance.interceptors.response.use(
  //  2xx 범위 상태 코드(성공)
  (response) => response,
  // 2xx 외의 범위 상태 코드(실패)
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest.isRetry) {
      originalRequest.isRetry = true;

      if (error.response.data.code === "UNAUTHORIZED") {
        alert(error.response.data.message);
        window.location.href = "/login";
      }

      try {
        const refreshToken = await getToken("refreshToken");
        if (!refreshToken) {
          return await Promise.reject(error);
        }

        const { accessToken } = await renewToken({ refreshToken });

        const newAccessToken = accessToken;
        if (newAccessToken) {
          await setCookie("accessToken", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return await instance(originalRequest);
        }
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        await deleteCookie("accessToken");
        await deleteCookie("refreshToken");
        return Promise.reject(refreshError);
      }
    }
    if (error.response.status === 403) {
      console.error("접근 권한이 없습니다");
      // 필요한 경우 리다이렉트 설정 추가 필요
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
export default instance;
