# Loaders

The goal of this practice is to write loaders for products

## Task 1

In your routes folder, you have two pages `home.tsx` and `products-home.tsx`. Each uses the same layout called `products-layout.tsx`. Right now, there is a loader in all three of these and all of they fetch an array of products. Your first task is to move that fetch for product data up into the layout so we don't write the logic twice and fetch the data twice when we navigate between pages. Just to be clear, this means we will not have a need for any loader except for in the `products-layout.tsx` file after your refactor.

The layout fetches brands too so you'll need to run the promise for `getBrands()` and `getProducts` in parallel and return both results:

```js
const [a, b] = await Promise.all([getA(), getB()])
```

## Task 2

When the layout page is successfully receiving `brands` and `products` from `loaderData` in props, you'll need to figure out a way to pass this data down into the page. Keep in mind that the `<Outlet />` in layout is not an alias for your page such that you can just pass props into it and these props will end up being props in your page component below. If you need to pass data from a layout into the page that the Outlet represents, you can do context.

1. Make an object and pass it into the outlet: `<Outlet context={context} />`
2. Outlets are technically "Context Providers" so you don't need to make your own context the way we would have done for a traditional React SPA.
3. Get the context value in the page component with `useOutletContext()`

You might see some typescript errors because `useOutletContext()` has no clue what it's receiving. If the JS code is accurate, even without types working, it will still run or you can do `useOutletContext<any>()` to tell TS not to complain about the type returned from `useOutletContext`.

## Task 3

If you need to pass data from a layout component to a page component, context is the way to do it. However, since we have our data coming from the layout's loader, we can pass that data strait from that loader down to the page below us. In other words:

```ts
// File 1: A Layout
export async function loader() {
  /* ... */
}
export default function Page({ loaderData }) {
  /* ... */
}

// File 2: A page that goes in the above layout
export async function loader() {
  /* ... */
}
export default function Page({ loaderData }) {
  // loaderData is my loader's data

  // This is how we get our parent's loader's data. The loader
  // above for File 1
  const parentLoaderData = useRouteLoaderData('routes/file-1')
}

// Notice that from File 2, we can get our loader data via props, but if we want to get
// our parent's loader data, we can just call useRouteLoaderData('path-to-route')
```

Switch away from context to `useRouteLoaderData(path-to-route)`

See more comments in the files
