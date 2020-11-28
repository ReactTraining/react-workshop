import * as React from "react";

const AuthStateContext = React.createContext();

const initialState = {
  authenticated: false,
  user: null,
};

export function AuthStateProvider({ children }) {
  const [state, dispatch] = React.useReducer((state, action) => {
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
  }, initialState);

  const value = {
    ...state,
    dispatch: React.useCallback(dispatch, []),
  };

  return <AuthStateContext.Provider value={value} children={children} />;
}

export function useAuthState() {
  return React.useContext(AuthStateContext);
}
