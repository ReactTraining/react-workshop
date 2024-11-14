# Lecture Notes

## Products

- Teach the basics of loaders
- Show how to use TypeScript with loader data and `useLoaderData`

```ts
// These are same
return { user: 'brad' }

return new Response(JSON.stringify({ user: 'brad' }), {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
```

## Misc

This is probably a good time to talk about other exports that we don't have lessons on like these:

```ts
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]
// <link rel="stylesheet" href="remix-generated-path-to-css-file.css" />

export const headers: HeadersFunction = ({ actionHeaders, loaderHeaders, parentHeaders }) => ({
  'Cache-Control': 'max-age=300, s-maxage=3600',
})

export const meta: MetaFunction = () => {
  return [
    { title: 'Shopping App' },
    {
      name: 'description',
      content: 'Our app description',
    },
  ]
}
// <title>Shopping App</title>
// <meta name="description" content="Our app description" />
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
