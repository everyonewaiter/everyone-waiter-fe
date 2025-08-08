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
};

type Action =
  | { type: "CLICK_PHONE_AUTH_BTN" } // 버튼1 눌렀다 -> 로딩 시작
  | { type: "AUTH_REQUEST_SUCCESS" } // 인증코드 발송 성공
  | { type: "AUTH_REQUEST_FAIL" } // 인증코드 발송 실패
  | { type: "CLICK_AUTH_CODE_BTN" } // 버튼2 눌렀다 -> 로딩 시작
  | { type: "VERIFY_SUCCESS" } // 인증 성공
  | { type: "VERIFY_FAIL" } // 인증 실패
  | { type: "DECREASE_TIME" } // 타이머 설정 (300초 - 5분)
  | { type: "RESET" }; // 타이머 초기화

export default function useSignupReducer() {
  const INIT_TIME = 300;

  function reducer(
    state: typeof initialState,
    action: Action
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
          authBtnLoading: false,
          startTimer: false,
          authTime: 0,
        };
      case "VERIFY_FAIL":
        return {
          ...state,
          authBtnLoading: false,
          authDisabled: false,
          startTimer: false,
        };
      case "DECREASE_TIME":
        return {
          ...state,
          authTime: Math.max(0, state.authTime - 1),
          startTimer: state.authTime - 1 > 0,
        };
      case "RESET":
        return initialState;
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
