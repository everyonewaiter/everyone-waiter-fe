import { useReducer } from "react";

type Action =
  | { type: "start-auth" }
  | { type: "stop-auth" }
  | { type: "decrease-time" }
  | { type: "success" }
  | { type: "fail" }
  | { type: "reset" };

export default function useAuthReducer() {
  const INIT_TIME = 300;

  const initialState = {
    isSubmitted: false,
    authTime: INIT_TIME,
    disables: {
      requestAuthentication: false,
      requestNumCheck: false,
      goToNextStep: false,
    },
  };

  function reducer(state: typeof initialState, action: Action) {
    switch (action.type) {
      case "start-auth":
        return {
          ...state,
          isSubmitted: true,
          disables: { ...state.disables, requestNumCheck: false },
          authTime: INIT_TIME,
        };
      case "stop-auth":
        return {
          ...state,
          isSubmitted: false,
          disables: { ...state.disables, requestNumCheck: true },
          authTime: 0,
        };
      case "decrease-time":
        return {
          ...state,
          authTime: state.authTime - 1,
        };
      case "success":
        return {
          ...state,
          isSubmitted: false,
          disables: {
            requestAuthentication: true,
            requestNumCheck: true,
            goToNextStep: true,
          },
          authTime: 0,
        };
      case "fail":
        return {
          ...state,
          isSubmitted: true,
          disables: {
            ...state.disables,
            requestNumCheck: false,
            goToNextStep: false,
          },
        };
      case "reset":
        return initialState;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
}
