# Lecture Notes

## Prefetch data intelligently before the user needs it

```jsx
<Link prefetch="none"></Link> // Default
<Link prefetch="render"></Link>
<Link prefetch="intent"></Link>

<PrefetchPageLinks page="/path" />
```

## Caching

https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
https://gist.github.com/kentcdodds/0c6f183531beeafe771eb48a3586707b

```tsx
export async function loader() {
  // get user data...

  // return user
  return data(user, {
    // Data Caching
    headers: { 'Cache-Control': `s-maxage=${FIVE_MINUTES}, stale-while-revalidate=${ONE_HOUR}` },
  })
}

export const headers = () => {
  // Page Caching
  return { 'Cache-Control': `public, max-age=${ONE_HOUR}, s-maxage=${ONE_HOUR}` }
}
```

## Defer

```tsx
export const loader = async () => {
  const [user, product] = await Promise.all([getAuth(), getProduct()])
  const commentsPromise = getProductComments()
  return { user, product, commentsPromise }
}

export default function ProductProfile() {
  const { user, product, commentsPromise } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>{product.name}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={commentsPromise} error>
          {(comments) => {
            return <div>Comments: {comments[0]}</div>
          }}
        </Await>
      </Suspense>
    </div>
  )
}
```

https://remix.run/docs/en/main/utils/defer

Why not defer everything by default?
The Remix defer API is another lever Remix offers to give you a nice way to choose between trade-offs. Do you want a better TTFB (Time to first byte)? Defer stuff. Do you want a low CLS (Content Layout Shift)? Don't defer stuff. You want a better TTFB, but also want a lower CLS? Defer just the slow and unimportant stuff.
