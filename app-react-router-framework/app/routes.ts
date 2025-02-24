import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  //
  layout('./routes/products-layout.tsx', [
    index('./routes/home.tsx'),
    // route("login", "./auth/login.tsx"),
    // route("register", "./auth/register.tsx"),
  ]),
] satisfies RouteConfig
