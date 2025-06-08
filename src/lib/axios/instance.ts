/* eslint-disable no-console */
/* eslint-disable no-alert */
import axios from "axios";
import { setupInterceptors, setupDeviceInterceptors } from "./interceptors";

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1`;

// NOTE - 로그인/회원가입 등 토큰이 필요 없는 instance
const authInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

// NOTE - formData 관련 Instance
const formInstance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
  timeout: 5000,
});

// NOTE - 기기용 instance
const signatureInstance = axios.create({
  timeout: 5000,
});

// NOTE - 일반 instance
const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

// NOTE - 요청 인터셉터(요청 전달 전 작업 수행)

setupInterceptors(instance);
setupInterceptors(formInstance);
setupDeviceInterceptors(signatureInstance);

export { instance, formInstance, authInstance, signatureInstance };
