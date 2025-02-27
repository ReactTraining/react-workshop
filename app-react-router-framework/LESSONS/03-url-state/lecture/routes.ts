import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('./routes/main-layout.tsx', [
    layout('./routes/products-layout.tsx', [
      //
      index('./routes/products-home.tsx'),
    ]),
    route('page2', './routes/page2.tsx'),
    // Final
    route('final', './routes/final.products-layout.tsx', [
      index('./routes/final.products-home.tsx'),
    ]),
  ]),
] satisfies RouteConfig
