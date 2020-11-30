// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { FaSignInAlt, FaExclamationCircle } from "react-icons/fa";

import Heading from "YesterTech/Heading";
import Notice from "YesterTech/Notice";
import Centered from "YesterTech/Centered";
import api from "YesterTech/api";
import { UserNoPassword } from "YesterTech/types";

interface LoginFormProps {
  onAuthenticated?(user: any): any;
}

// const [loading, setLoading] = React.useState<boolean>(false);
// const [error, setError] = React.useState<any>(null);
// const [user, setUser] = React.useState<UserNoPassword | null>(null);
interface LoginState {
  loading: boolean;
  error: any;
  user: UserNoPassword | null;
}

type LoginActions =
  | { type: "LOGIN" }
  | { type: "SUCCESS"; user: UserNoPassword }
  | { type: "ERROR"; message: string };

const initialState: LoginState = {
  loading: false,
  error: null,
  user: null,
};

function LoginForm({ onAuthenticated }: LoginFormProps): React.ReactElement {
  const usernameRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  // Change to reducer, then state machine
  const [state, dispatch] = React.useReducer(function reducer(
    state: LoginState,
    action: LoginActions
  ) {
    switch (action.type) {
      case "LOGIN":
        return {
          user: null,
          error: false,
          loading: true,
        };
      case "SUCCESS":
        return {
          loading: false,
          error: false,
          user: action.user,
        };
      case "ERROR":
        return {
          loading: false,
          user: null,
          error: action.message,
        };
      default:
        return state;
    }
  },
  initialState);

  const loading = state.loading;
  const error = state.error;
  const user = state.user;

  React.useEffect(() => {
    let isCurrent = true;
    let username = usernameRef.current?.value;
    let password = passwordRef.current?.value;

    if (loading) {
      if (!username && !password) {
        dispatch({
          type: "ERROR",
          message: "Username and password are required to login",
        });
        return;
      }
      if (!username) {
        dispatch({ type: "ERROR", message: "Username is required to login" });
        return;
      }
      if (!password) {
        dispatch({ type: "ERROR", message: "Password is required to login" });
        return;
      }

      api.auth
        .login(username, password)
        .then((user) => {
          if (isCurrent) {
            dispatch({ type: "SUCCESS", user });
          }
        })
        .catch((error) => {
          if (isCurrent) {
            dispatch({ type: "ERROR", message: error });
          }
        });
    }
    return () => {
      isCurrent = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (user && onAuthenticated) {
      onAuthenticated(user);
    }
  }, [onAuthenticated, user]);

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch({ type: "LOGIN" });
  }

  return (
    <Centered className="spacing">
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}

        <div className="form-field">
          <input
            ref={usernameRef}
            aria-label="Username"
            disabled={loading}
            type="text"
            placeholder="Username"
          />
        </div>

        <div className="form-field">
          <input
            // You can pass the ref directly in like above with username,
            // or we can pass a function in and assign the current ourselves
            ref={(node) => (passwordRef.current = node)}
            aria-label="Password"
            disabled={loading}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <label>
            <input
              onChange={() => setShowPassword(!showPassword)}
              disabled={loading}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{" "}
            show password
          </label>
        </div>

        <footer>
          <button type="submit" className="button" disabled={loading}>
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <span>Loading ...</span>
            )}
          </button>
        </footer>
      </form>
    </Centered>
  );
}

export default LoginForm;
