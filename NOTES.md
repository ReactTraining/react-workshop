# SPA

- Using React Router - <Route></Route> - JSX based router

# Frameworks (Hybrid of best of SPA (CSR) and SSR)

## NextJS

- app (router or api) RSC

  - file based router (but different from pages)
  - Some components are RSC (<-- default) and some are Client comp
  - you get data from the RSC itself
  - directives: use client and use server
  - I like what they're supposed to be, and solve 👍 (less hydration less bundle size)
  - Lots of rules and baggage especially for mutations 👎

- pages router (original Next)

  - file based router
  - ALL components are Client components that hydrate
  - you get data from `getServerSideProps`

## Remix / RRFM

- I like what they're supposed to be, and solve 👍 (less hydration less bundle size)
- loaders and actions 👍 instead of RSC style mutations
