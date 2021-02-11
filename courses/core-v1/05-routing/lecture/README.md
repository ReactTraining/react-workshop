# Notes for Instructor

## Teach `Route`, `Link`, `Switch`, `Redirect` (and nested layout concepts)

Browser: http://localhost:3000

The `PrimaryLayout` starts with several components that might resemble what the graphic design team has given to us in terms of static HTML. Our task is you use them to explain React Router with layouts and sub layouts involved.

1. First, start by showing how the `PrimaryLayout` is currently hard-coded to display the `Home` page. Swap that out for the `ProductProfile` page to start a conversation about SPA's and how the transition between two pages in React is really just mounting and un-mounting components.

2. In `PrimaryLayout`, write some `Route`s (without `Switch`) to start the conversation about React Router and how Route is kind-of like an if-statement component that is listening to the browser URL:

```jsx
<Route path="/">
  <Home />
</Route>
<Route path="/products/1">
  <ProductProfile />
</Route>
```

- You'll have to manually navigate to `products/1` to show that page for now.
- Show them that both the `Home` and `ProductProfile` pages load when we go to `/products/1`.
- Now's a good time to explain `exact` prop and also `Switch`:

```jsx
<Switch>
  <Route path="/" exact>
    <Home />
  </Route>
  <Route path="/products/1">
    <ProductProfile />
  </Route>
</Switch>
```

- Now we can explain that the `ProfileProfile` is actually meant to be within a sub-layout. In fact, all pages within the URL `/products` should use `ProductsLayout`. So Refactor to:

```jsx
<Route path="/products">
  <ProductsLayout />
</Route>
```

- Both the "Home" and "Products" links in the top primary nav will work now. But they are still `<a>` and therefore are doing full page refreshes, refactor them to `<Link>`

- `ProductLayout` now needs its own `Switch` for showing the `BrowseProducts` and `ProductProfile` pages. Note that the parameter variable needs to be `:productId`
- Also show `Redirect`

```jsx
<Switch>
  <Route path="/products" exact>
    <BrowseProducts />
  </Route>
  <Route path="/products/:productId">
    <ProductProfile />
  </Route>
  <Redirect to="/products" />
</Switch>
```

- Now you can browse the products and click on each to see its profile (although the profile is still hard coded). Be sure to convert the anchors to `Link`s in `BrowseProducts`

## `useParams`

- Introduce the `useParams` hook in `ProductProfile`

## `BrowserRouter`

- Open `App.js`
- Just briefly explain that anything that uses React Router components needs to be wrapped in this provider. We haven't even explained context yet so we can gloss over some details and come back to this thought later after context.

## `useRouteMatch`

- Currently there is some duplication of paths. For example the `Route`s in `ProductsLayout` have `/products` since we need to build the URL up from the start again (even though the `PrimaryLayout`) does `/products` also. So we can refactor to

```jsx
const match = useRouteMatch()
// ...
<Route path={`${match.path}/:productId`} >
```

- Explain how if we pass a string `path` argument into `useRouteMatch` it will give us the matching meta-data based on that path instead of the current path (which is the default when no args).
