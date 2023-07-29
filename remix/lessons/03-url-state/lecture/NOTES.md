# Lecture Notes

https://medium.com/swlh/urlsearchparams-in-javascript-df524f705317

The code starts off using the hook for getting an instance of searchParams:

```js
const [searchParams, setSearchParams] = useSearchParams()
```

Show the native URLSearchParams:

```js
// Three ways to get an instance of URL Search Params

// 1. From URLSearchParams
const search = new URLSearchParams('a=b&c=d')

// 2. From URL
const url = new URL('https://example.com?a=b&c=d')
const search = url.searchParams

// 3. Hooks way (search is an instance of URLSearchParams)
const [search] = useSearchParams()

// Getters and setters
search.set('brand', 'google')
const brand = search.get('brand')

// Delete
search.delete('brand')

// Serialize the search object into a string
search.toString()
```

Get the FilterLinks to work:

```js
// Current URL
const [search] = useSearchParams()
const brand = search.get('brand')

// Next URL
const nextSearch = new URLSearchParams(search.toString())
const on = brand === value
if (on) {
  nextSearch.delete('brand')
} else {
  nextSearch.set('brand', value)
}

const url = useLocation().pathname
const to = `${url}?${nextSearch.toString()}`
```

Then get the filtering to work which is mostly there but commented out in the index page

Once the filtering is working, we're doing this in a weird place because our component filters on the server and responds with good HTML (that has filtered products). But if the loader gets hit as an XHR endpoint, it will return everything and we'll be filtering on the client.

The purpose of `page2` is to demonstrate this problem in the network tab. Navigate away from the home page and back to the home page shows the loader returning every product to the client.

Moving the filter to the loader just means our database is returning everything and we're filtering in Node

The best solution is to filter from the database standpoint. Our `getProducts()` function will already do that if we pass it searchParams:

```ts
export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams
  const products = await getProducts(searchParams)
  // ...
}
```

## Get the sidebar links to work

(see final)
