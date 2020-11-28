import * as React from "react";
import Heading from "YesterTech/Heading";
import { useAuthState } from "YesterTech/AuthState";

function Account(): React.ReactElement {
  const { user } = useAuthState();
  return (
    <div className="spacing">
      <Heading>My Account</Heading>
      {user ? (
        <div>
          Welcome to your account management page, {user.name}. You can only see
          this page if logged in.
        </div>
      ) : (
        <div>Uh oh! You need to log in!</div>
      )}
    </div>
  );
}

export default Account;
