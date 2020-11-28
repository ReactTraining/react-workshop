import * as React from "react";

export function usePromise<T, E = any>(
  promise: () => Promise<T>
): [T | null, boolean, any] {
  const [state, dispatch] = React.useReducer(
    function promiseReducer(
      state: PromiseState<T>,
      action: PromiseActions<T, E>
    ): PromiseState<T> {
      switch (action.type) {
        case "LOADING":
          return { ...state, loading: true };
        case "RESOLVED":
          return {
            ...state,
            loading: false,
            response: action.response,
            error: null,
          };
        case "ERROR":
          return {
            ...state,
            loading: false,
            response: null,
            error: action.error,
          };
        default:
          return state;
      }
    },
    {
      loading: false,
      response: null,
      error: null,
    }
  );

  React.useEffect(() => {
    let isCurrent = true;
    dispatch({ type: "LOADING" });
    promise()
      .then((response) => {
        if (!isCurrent) {
          return;
        }
        dispatch({ type: "RESOLVED", response });
      })
      .catch((error) => {
        dispatch({ type: "ERROR", error });
      });
    return () => {
      isCurrent = false;
    };
  }, [promise]);

  return [state.response, state.loading, state.error];
}

export default usePromise;

type PromiseState<T> = {
  loading: boolean;
  response: null | T;
  error: null | any;
};

type PromiseActions<T, E> =
  | { type: "LOADING" }
  | { type: "RESOLVED"; response: T }
  | { type: "ERROR"; error: E };
