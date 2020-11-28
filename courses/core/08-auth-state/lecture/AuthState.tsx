import * as React from "react";
import { UserNoPassword } from "YesterTech/types";

const initialState: AuthState = {
  authenticated: false,
  user: null,
};

const AuthStateContext = React.createContext<AuthStateContextValue>({
  ...initialState,
  dispatch() {},
});

export const AuthStateProvider: React.FC = function AuthStateProvider({
  children,
}) {
  const [state, dispatch] = React.useReducer(function authReducer(
    state: AuthState,
    action: AuthActions
  ): AuthState {
    switch (action.type) {
      case "LOGIN":
        return { ...state, authenticated: true, user: action.user };
      case "LOGOUT":
        return { ...initialState };
      default:
        return state;
    }
  },
  initialState);

  const value = {
    ...state,
    dispatch,
  };

  return <AuthStateContext.Provider value={value} children={children} />;
};

export function useAuthState() {
  return React.useContext(AuthStateContext);
}

type AuthState = {
  authenticated: boolean;
  user: null | UserNoPassword;
};

type AuthDispatch = React.Dispatch<AuthActions>;

type AuthStateContextValue = AuthState & {
  dispatch: AuthDispatch;
};

type AuthActions =
  | {
      type: "LOGIN";
      user: UserNoPassword;
    }
  | {
      type: "LOGOUT";
    };
