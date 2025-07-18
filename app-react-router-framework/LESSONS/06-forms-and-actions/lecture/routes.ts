import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('./routes/main-layout.tsx', [
    route('start', './routes/start.tsx'),
    route('login', './routes/login.tsx'),

    layout('./routes/products-layout.tsx', [
      index('./routes/products-home.tsx'),
      route('final', './routes/final.products-home.tsx'),
    ]),
    // Final
    route('final/login', './routes/final.login.tsx'),
  ]),
] satisfies RouteConfig
