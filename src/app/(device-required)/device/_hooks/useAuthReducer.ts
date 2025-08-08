import { useEffect, useReducer } from "react";

const initialState = {
  phoneDisabled: false,
  phoneBtnDisabled: false,
  phoneBtnLoading: false,

  authDisabled: true,
  authBtnDisabled: true,
  authBtnLoading: false,

  hasRequestedAuth: false,

  authTime: 0,
  startTimer: false,
};

type Action =
  | { type: "CLICK_AUTH_BTN" } // 인증요청 버튼 클릭
  | { type: "stop-auth" } // 타이머·인증 세션 강제 종료(시간 만료/초기화)
  | { type: "DECREASE_TIME" }
  | { type: "VERIFY_SUCCESS" } // 인증번호 검증 성공
  | { type: "VERIFY_FAIL" } // 인증번호 검증 실패
  | { type: "RESET" };

function reducer(
  state: typeof initialState,
  action: Action
): typeof initialState {
  const INIT_TIME = 300;

  switch (action.type) {
    case "CLICK_AUTH_BTN":
      return {
        ...state,
        phoneDisabled: true,
        phoneBtnDisabled: true,
        phoneBtnLoading: true,
        hasRequestedAuth: true,
        authTime: INIT_TIME,
        startTimer: true,
      };

    case "DECREASE_TIME":
      return {
        ...state,
        authTime: Math.max(0, state.authTime - 1),
        startTimer: state.authTime - 1 > 0,
      };

    case "VERIFY_SUCCESS":
      return {
        ...state,
        authDisabled: true,
        authBtnDisabled: true,
        authBtnLoading: false,
        phoneDisabled: true,
        phoneBtnDisabled: true,
        startTimer: false,
        authTime: 0,
      };

    case "VERIFY_FAIL":
      return {
        ...state,
        authDisabled: false,
        authBtnDisabled: false,
        authBtnLoading: false,
        startTimer: false,
        authTime: 0,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default function useAuthReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.startTimer) return;
    const id = setInterval(() => dispatch({ type: "DECREASE_TIME" }), 1000);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(id);
  }, [state.startTimer]);

  return { state, dispatch };
}
