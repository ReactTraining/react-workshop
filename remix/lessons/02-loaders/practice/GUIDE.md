# Loaders

The goal of this practice is to write loaders for products

## Task 1

In your routes folder, you have two pages for a home page and a `/products` page. Each uses the same layout. Right now, there is a loader in each of the pages to get product data. Your first task is to move that fetch for product data up into the layout so we don't write the logic twice and fetch the data twice when we navigate between pages.

The layout already fetches brands so you'll need to run the promise for `getBrands()` and `getProducts` in parallel and return both results:

```js
const [a, b] = await Promise.all(getA(), getB())
```

You'll also need to modify how `json()` returns data because you'll want to return brands and products now

## Task 2

When the layout component is successfully receiving `brands` and `products` from `useLoaderData()`, you'll need to figure out a way to pass this data down into the page. Keep in mind that the `<Outlet />` is not an alias for your page such that you can just pass props into it and these props will end up being props in your component. If you need to pass data from a layout into the page that the Outlet represents, you can do context.

1. Make an object and pass it into the outlet: `<Outlet context={context} />`
2. Outlets are technically "Context Providers" so you don't need to make your own context the way we would have done for a traditional React SPA.
3. Get the context value in the page component with `useOutletContext()`

You might see some typescript errors because `useOutletContext()` has no clue what it's receiving. If the JS code is accurate, even without types working, it will still run or you can do `useOutletContext<any>()` to tell TS not to complain about the type returned from `useOutletContext`.

## Task 3

Context is the only way to "pass" data from a layout to a page, but technically we don't need to do that at all. The loader data from the layout is also available to all the sub pages or layouts so you could just call useRouteLoaderData('route/your-path') in the page instead of `useOutletContext()`.

Switch away from context to `useRouteLoaderData(path)`

Here's the code you'll need although it doesn't have any TypeScript types so see if you can figure that out based on other similar code we've done so far:

```ts
useRouteLoaderData('routes/_products-layout')
```

Docs: https://remix.run/docs/en/main/hooks/use-route-loader-data
