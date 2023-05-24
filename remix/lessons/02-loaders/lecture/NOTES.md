# Lecture Notes

## Products

- Teach the basics of loaders
- Show how to use TypeScript with loader data and `useLoaderData`
- Show our utility `UnpackLoader` for easier loader types. Remember we have to do `as LoaderData` instead of a generic for this to work.

```ts
// These are same
return json({ user: 'brad' })

return new Response(JSON.stringify({ user: 'brad' }), {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
```

## Account

- Load Data in Parallel vs Serial
- Naming things `*.server.tsx`
- Pass data down from layout to page with `<Outlet context={} />`
- Show how to do `useMemo` on the context object
- Show `useOutletContext()` on the child pages
- Switch to useRouteLoaderData:

```ts
// Where the loader is (layout)
useLoaderData()

// In the child pages
useRouteLoaderData('routes/account')
```
