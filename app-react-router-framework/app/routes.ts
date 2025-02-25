import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('./routes/main-layout.tsx', [
    layout('./routes/products-layout.tsx', [
      index('./routes/home.tsx'),
      route('products', './routes/products-home.tsx'),
      route('products/:productId', './routes/product-profile.tsx'),
    ]),
    route('login', './routes/login.tsx'),
    route('register', './routes/register.tsx'),
    route('logout', './routes/logout.tsx'),
    route('cart', './routes/cart.tsx'),
  ]),
] satisfies RouteConfig
