import { type RouteConfig, index, layout } from '@react-router/dev/routes'

export default [
  layout('./routes/main-layout.tsx', [
    layout('./routes/products-layout.tsx', [
      //
      index('./routes/products-home.tsx'),
    ]),
  ]),
] satisfies RouteConfig
