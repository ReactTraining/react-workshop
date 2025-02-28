import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('./routes/main-layout.tsx', [
    index('./routes/home.tsx'),
    route('login', './routes/login.tsx'),
    // Final
    route('final/login', './routes/final.login.tsx'),
  ]),
] satisfies RouteConfig
