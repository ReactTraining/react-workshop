import * as React from "react";
import { UserNoId } from "YesterTech/types";

const initialState: AuthState = {
  authenticated: false,
  user: null,
};

const AuthStateContext = React.createContext<AuthState>(initialState);
const AuthDispatchContext = React.createContext<AuthDispatch>(
  function dispatch() {}
);

export type AuthActionTypes = "LOGIN" | "LOGOUT";

export const AuthStateProvider: React.FC = function AuthStateProvider({
  children,
}) {
  const [state, dispatch] = React.useReducer(function authReducer(
    state: AuthState,
    action: AuthActions
  ): AuthState {
    switch (action.type) {
      case "LOGIN": {
        return { ...state, authenticated: true, user: action.user };
      }
      case "LOGOUT": {
        return { ...initialState };
      }
      default:
        return state;
    }
  },
  initialState);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export function useAuthDispatch(): AuthDispatch {
  return React.useContext(AuthDispatchContext);
}

export function useAuthState(): AuthState {
  return React.useContext(AuthStateContext);
}

type AuthState = {
  authenticated: boolean;
  user: null | UserNoId;
};

type AuthDispatch = React.Dispatch<AuthActions>;

type AuthActions =
  | {
      type: "LOGIN";
      user: UserNoId;
    }
  | {
      type: "LOGOUT";
    };
