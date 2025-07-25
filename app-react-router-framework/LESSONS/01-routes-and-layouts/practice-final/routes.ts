import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('./routes/main-layout.tsx', [
    // loader
    layout('./routes/common-layout.tsx', [
      // loader
      index('./routes/home.tsx'), // loader
      route('contact', './routes/contact.tsx'),
    ]),
    route('auth', './routes/auth-layout.tsx', [
      route('login', './routes/auth-login.tsx'),
      route('register', './routes/auth-register.tsx'),
    ]),
    route('products', './routes/products-layout.tsx', [
      index('./routes/products-home.tsx'),
      route(':productId', './routes/products-profile.tsx'),
      route('special', './routes/products-special.tsx'),
    ]),
  ]),
] satisfies RouteConfig
