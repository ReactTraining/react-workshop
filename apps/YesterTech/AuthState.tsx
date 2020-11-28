import * as React from "react";
import { UserNoId } from "YesterTech/types";

const AuthStateContext = React.createContext({} as AuthContextValue);

export type AuthActionTypes = "LOGIN" | "LOGOUT";

const initialState: AuthState = {
  authenticated: false,
  user: null,
};

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

  const value = {
    ...state,
    dispatch: React.useCallback(dispatch, []),
  };

  return <AuthStateContext.Provider value={value} children={children} />;
};

export function useAuthState() {
  return React.useContext(AuthStateContext);
}

type AuthState = {
  authenticated: boolean;
  user: null | UserNoId;
};

type AuthContextValue = AuthState & {
  dispatch: React.Dispatch<AuthActions>;
};

type AuthActions =
  | {
      type: "LOGIN";
      user: UserNoId;
    }
  | {
      type: "LOGOUT";
    };
