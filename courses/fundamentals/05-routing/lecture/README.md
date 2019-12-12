# Lecture Notes

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
- Now's a good time to explain `exact` prop and also `<Switch>`:

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
