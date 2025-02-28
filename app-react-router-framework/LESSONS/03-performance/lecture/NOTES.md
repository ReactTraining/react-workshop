# Lecture Notes

All of the Link prefetching and deferred "related products" code is already written. This is mostly a show-and-tell

MUST READ: https://remix.run/docs/en/main/guides/single-fetch

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
