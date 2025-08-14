import { useEffect, useReducer } from "react";

const initialState = {
  phoneDisabled: false,
  phoneBtnLoading: false,
  phoneBtnDisabled: false,

  authDisabled: true,
  authBtnLoading: false,
  authBtnDisabled: true,

  authTime: 0,
  startTimer: false,

  hasRequestedAuth: false,
  hasExceededAuthRequest: false,
  authExpired: false,
};

export type ReducerAction =
  | { type: "CLICK_PHONE_AUTH_BTN" } // 버튼1 눌렀다 -> 로딩 시작
  | { type: "AUTH_REQUEST_SUCCESS" } // 인증코드 발송 성공
  | { type: "AUTH_REQUEST_FAIL" } // 인증코드 발송 실패
  | { type: "CLICK_AUTH_CODE_BTN" } // 버튼2 눌렀다 -> 로딩 시작
  | { type: "VERIFY_SUCCESS" } // 인증 성공
  | { type: "VERIFY_FAIL" } // 인증 실패
  | { type: "DECREASE_TIME" } // 타이머 설정 (300초 - 5분)
  | { type: "RESET" } // 타이머 초기화
  | { type: "EXCEEDED" }; // 요청 횟수 초과 (5번)

export default function useAuthReducer() {
  const INIT_TIME = 300;

  function reducer(
    state: typeof initialState,
    action: ReducerAction
  ): typeof initialState {
    switch (action.type) {
      case "CLICK_PHONE_AUTH_BTN":
        return {
          ...state,
          phoneDisabled: true,
          phoneBtnLoading: true,
          phoneBtnDisabled: true,
        };
      case "AUTH_REQUEST_SUCCESS":
        return {
          ...state,
          phoneBtnLoading: false,
          phoneBtnDisabled: false, // 재인증 가능
          hasRequestedAuth: true,
          authDisabled: false,
          authBtnDisabled: false,
          authTime: INIT_TIME,
          startTimer: true,
          authExpired: false,
        };
      case "AUTH_REQUEST_FAIL":
        return {
          ...state,
          phoneDisabled: false,
          phoneBtnLoading: false,
          phoneBtnDisabled: false,
        };

      case "CLICK_AUTH_CODE_BTN":
        return {
          ...state,
          authDisabled: true,
          authBtnLoading: true,
          authBtnDisabled: true,
        };
      case "VERIFY_SUCCESS":
        return {
          ...state,
          phoneDisabled: true,
          authDisabled: true,
          authBtnDisabled: true,
          phoneBtnDisabled: true,
          authBtnLoading: false,
          startTimer: false,
          authTime: 0,
        };
      case "VERIFY_FAIL":
        return {
          ...state,
          authBtnLoading: false,
          authDisabled: false,
          authBtnDisabled: false,
          phoneBtnDisabled: false,
        };
      case "DECREASE_TIME": {
        const next = Math.max(0, state.authTime - 1);
        const expired = next === 0;
        return {
          ...state,
          authTime: next,
          startTimer: !expired,
          authDisabled: expired ? true : state.authDisabled,
          authBtnDisabled: expired ? true : state.authBtnDisabled,
          authExpired: expired ? true : state.authExpired,
        };
      }
      case "EXCEEDED":
        return {
          ...initialState,
          phoneDisabled: true,
          hasExceededAuthRequest: true,
        };
      case "RESET":
        return {
          ...initialState,
          hasExceededAuthRequest: false,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.startTimer) return;
    const id = setInterval(() => dispatch({ type: "DECREASE_TIME" }), 1000);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(id);
  }, [state.startTimer]);

  return {
    state,
    dispatch,
  };
}
