import { type RouteConfig, index, layout, route, prefix } from '@react-router/dev/routes'

export default [
  layout('./routes/main-layout.tsx', [
    index('./routes/home.tsx'),
    route(':productId', './routes/product-profile.tsx'),
    route('account', './routes/account-layout.tsx', [
      index('./routes/account-home.tsx'),
      route('settings', './routes/account-settings.tsx'),
    ]),
    // // Final
    // ...prefix('final', [
    //   index('./routes/final.home.tsx'),
    //   route(':productId', './routes/final.product-profile.tsx'),
    // ]),
  ]),
] satisfies RouteConfig
