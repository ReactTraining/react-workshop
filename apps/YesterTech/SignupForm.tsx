import * as React from "react";
import { Columns, Column } from "react-flex-columns";

import Heading from "YesterTech/Heading";
import Avatar from "YesterTech/Avatar";
import Centered from "YesterTech/Centered";
import api from "YesterTech/api";
import {
  ReactComponentWithoutChildren,
  UserNoPassword,
  UserNoId,
} from "YesterTech/types";

interface SignupFormProps {
  onSignup?(user: UserNoPassword): any;
}

const SignupForm: ReactComponentWithoutChildren<SignupFormProps> = function SignupForm({
  onSignup,
}): React.ReactElement {
  const [useGitHub, setUseGitHub] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  // This is meant to stay here as a reminder
  React.useEffect(() => {
    console.log(
      "Keep in mind for workshops, GitHub has a rate limit of 60 requests per hour"
    );
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user: UserNoId = { username, name, password, avatarUrl };
    api.users.registerUser(user).then((registeredUser) => {
      const { password, ...user } = registeredUser;
      if (onSignup) {
        onSignup(user);
      }
    });
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function searchGitHub() {
    api.auth.getGitHubUser(username).then((user) => {
      if (user) {
        setName(user.name || "");
        setAvatarUrl(user.avatar_url || "");
      }
    });
  }

  return (
    <Centered className="spacing">
      <Columns gutters>
        <Column>
          <Avatar size={4} src={avatarUrl} />
        </Column>
        <Column flex className="spacing-small">
          <Heading>Signup</Heading>
          <div>
            <label>
              <input
                type="checkbox"
                defaultChecked={useGitHub}
                onChange={() => setUseGitHub(!useGitHub)}
              />{" "}
              Use GitHub
            </label>
          </div>
        </Column>
      </Columns>
      <form onSubmit={handleSubmit} className="spacing">
        <Columns gutters middle>
          <Column flex>
            <div className="form-field">
              <input
                aria-label="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder={useGitHub ? "GitHub Username" : "Username"}
                onKeyPress={(event) => {
                  if (event.key === "Enter" && useGitHub) {
                    event.preventDefault();
                    searchGitHub();
                  }
                }}
              />
            </div>
          </Column>
          {useGitHub && (
            <Column>
              <button type="button" className="button" onClick={searchGitHub}>
                Search
              </button>
            </Column>
          )}
        </Columns>
        <div className="form-field">
          <input
            aria-label="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder={
              useGitHub
                ? "Create a YesterTech Password (Not GitHub)"
                : "Password"
            }
          />
          <label>
            <input
              onChange={handleShowPassword}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{" "}
            show password
          </label>
        </div>
        <div className="form-field">
          <input
            aria-label="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            disabled={useGitHub}
          />
        </div>
        <div className="form-field">
          <input
            aria-label="avatar-url"
            onChange={(e) => setAvatarUrl(e.target.value)}
            value={avatarUrl}
            type="text"
            placeholder="Avatar URL: https://"
            disabled={useGitHub}
          />
        </div>
        <footer>
          <button type="submit" className="button">
            Signup
          </button>
        </footer>
      </form>
    </Centered>
  );
};

export default SignupForm;
