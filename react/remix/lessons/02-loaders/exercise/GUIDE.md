# Loaders

The goal of this exercise is to write loaders for products

## Task 1

The current setup has a loader in every file. But if you notice, the pages each try to do `getProducts()` on their own and this could be done in the layout instead. The layout already fetches brands so you'll need to run the promise for `getBrands()` and `getProducts` in parallel and return both results

## Task 2

When the layout component is successfully receiving `brands` and `products` from `useLoaderData()`, you'll need to figure out a way to pass this data down into the page. Keep in mind that the `<Outlet />` is not an alias for your page such that you can just pass props into it and these props will end up being props in your component. If you need to pass data from a layout into the page that the Outlet represents, you can do context.

1. Make a context variable and pass it into the outlet: `<Outlet context={context} />`
2. Outlets are technically "Context Providers" so you don't need to make your own context the way we would have done for a traditional React SPA.
3. Get the context value in the page component with `useOutletContext()`

You might see some typescript errors because `useOutletContext()` has no clue what it's receiving. If the code is accurate, it should still work, or you can do `useOutletContext<any>()` to tell TS not to complain.

## Task 3

Context is the only way to "pass" data from a layout to a page, but technically we don't need to do that at all. The loader data from the layout is also available to all the sub pages or layouts so you could just call useRouteLoaderData('route/your-path') in the page instead of `useOutletContext()`.

Switch away from context to `useRouteLoaderData(path)`

Docs: https://remix.run/docs/en/main/hooks/use-route-loader-data
