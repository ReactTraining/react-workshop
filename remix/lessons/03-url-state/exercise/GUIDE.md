https://medium.com/swlh/urlsearchparams-in-javascript-df524f705317

```js
// Three ways to get the search params object
const url = new URL('https://example.com?a=b')
const search = url.searchParams

const search = new URLSearchParams('https://example.com?a=b')

// Hooks way
const [search] = useSearchParams()

// Getters and setters
search.set('brand', 'google')
const brand = search.get('brand')

// Delete
search.delete('brand')
```
