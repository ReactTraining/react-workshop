# Routes And Layouts

The goal of this practice is to make files for these routes:

```js
// URL                               SUB LAYOUT      CONTENT
// localhost:3000                    CommonLayout    "Home Page"
// localhost:3000/contact            CommonLayout    "Contact"
// localhost:3000/auth/login         AuthLayout      "Login"
// localhost:3000/auth/register      AuthLayout      "Register"
// localhost:3000/products           ProductsLayout  "Browse Products"
// localhost:3000/products/1         ProductsLayout  "Product Profile: 1"
// localhost:3000/products/special   ProductsLayout  "Special Product Profile"
```

## Task 1

The only file you'll edit is `routes.tsx`

Each URL the user can visit loads a page, that page will be built from three files: The main layout, a sub-layout, and the page itself. Above you can see which URL someone will visit to see each sub-layout they'll get. All pages and layouts are already made, you just need to assemble the router in `routes.ts`.

Sub layouts are color coded as follows so you can visually see your success:

Gray - Common Layout
Green - AuthLayout
Blue - Product Layout

React Router lets you nest your routing instructions as follows. This example is taken from their docs so lets not assume their file names match up to ours:

```ts
import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes'

export default [
  index('./home.tsx'),
  route('about', './about.tsx'),

  layout('./auth/layout.tsx', [
    route('login', './auth/login.tsx'),
    route('register', './auth/register.tsx'),
  ]),
] satisfies RouteConfig
```

Most routes will use the `route()` function in real life. With it, you're simply saying if you visit _this path_ you get _this file_:

```ts
route('this-path', './this-file.tsx')
```

But some sites will use a hierarchy of layouts. To put your page in a layout, wrap its route in the `layout()` function:

```ts
layout('./some-layout.tsx', [
  route('page-one', './one.tsx')
  route('page-two', './two.tsx')
  route('page-three', './three.tsx')
])
```

Layouts don't add anything to the URL. So in this example above, someone would visit `site.com/page-one` and that page would nest inside the `some-layout.tsx` file. But what if you wanted a nested layout AND for a path to be added to the URL like `site.com/path/page-one`? Then use nested `route()` instead

```ts
route('path', './some-layout.tsx', [
  route('page-one', './one.tsx')      // <--- Now someone can visit /path/page-one in the URL and get this page
  route('page-two', './two.tsx')
  route('page-three', './three.tsx')
])
```

Now with this example, people can go to `/path/page....` but they can't go to `/path` because we don't have a main index page for it. For that we'll use `index()`:

```ts
route('path', './some-layout.tsx', [
  index('/index.tsx')                 // <--- Now someone can visit /path in the URL and get this page
  route('page-one', './one.tsx')
  route('page-two', './two.tsx')
  route('page-three', './three.tsx')
])
```

## Final

Remember, for this and all practices, there's a `final` version for you to review if you need to with all the answers. In this case, the final is in `practice-final`.
