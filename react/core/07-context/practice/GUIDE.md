# Context

## Goals

Authentication is already working, so from that standpoint this practice is more of a "show-and-tell" about authentication. However your practice will be to refactor the code to make it more flexible for authenticating many different possible routes that might get added later.

Right now, going to `/account` requires authentication. But in the future we want to authenticate many routes like `/account/settings` and `account/activity`. All routes starting with `/account` will eventually require authentication.

## Task 1

Come up with a plan to organize React Router (`index.tsx`) in a way that would allow authentication for many routes that start with `/account/...`

There is a big hint commented out in the bottom of `index.tsx`

## Finished When

You still have authentication working but you can easily imagine adding new routes in the future with essentially no effort to make them authenticated.
