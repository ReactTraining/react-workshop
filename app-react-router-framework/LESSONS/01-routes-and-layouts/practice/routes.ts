import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
  layout('./routes/main-layout.tsx', [
    // Other routes here:
    // index()
    // layout()
    // route()
  ]),
] satisfies RouteConfig
