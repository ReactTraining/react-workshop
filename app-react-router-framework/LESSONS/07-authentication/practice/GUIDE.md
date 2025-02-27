# Forms and Fetcher

First, review `utils/auth.server.ts` where we have lots of utility functions to help you manage your sessions

# Task 1

Work on the home page: `routes/_index.tsx` and get the message to correctly show the user's login status. It currently is hard-coded to always say the user is not logged in.

You can use the real login page to log into a user with:

username: admin
password: admin

If you need to remove a login session, you can do so in Chrome DevTools under Application > Cookies and remove the `react_training_auth` cookie.

# Task 2

Copy the login page and all it's code to make a `routes/register.tsx` page. Almost all the code is the same but you'll probably want to update the header and button label to say "Register" instead of "Login".

The only real difference between login and register will be in the action. Instead of verifying a user before you create the user session, you'll see if the username exists already with `usernameExists(username)`. If it does you should respond with a 400 status code. Then you use `registerUser(username, password)` to register the user and then create the session. Both of those functions can be found in the `auth.server.ts` file.
