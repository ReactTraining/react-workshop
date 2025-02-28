import { type RouteConfig, index, layout, route, prefix } from '@react-router/dev/routes'

export default [
  layout('./routes/main-layout.tsx', [
    layout('./routes/products-layout.tsx', [
      index('./routes/home.tsx'),
      route(':productId', './routes/product-profile.tsx'),
    ]),
  ]),
] satisfies RouteConfig
