# URL State

The goal of this practice is to practice using the URL for state. The URL is not only a legitimate place to keep state between the front-end and back-end, it's actually the original place for keeping state before Single Page Apps.

# Task 1

The only component you'll need to work on is inside of `_products-layout` called `FilterLink`. Right now, it works for clicking on filters in the UI and toggling the URL so only one brand can be filtered at one time. We want you to re-write the algorithm in `FilterLink` so if the user clicks two checkboxes, we'll have two brands in the filter like this:

localhost:3000/products?brand=apple%2Cgoogle

Keep in mind that %2C is a URL-encoded comma. When you set the value in your code, you'll set it as `apple,google` and the URLSearchParams class will take care of the encoding for you. When you read the value from the URL, they'll take care of the decoding for you and you'll receive `apple,google`.

1. When a user clicks Apple, the URL should change to `?brand=apple`
2. When the user then clicks Google, the URL should change to `?brand=apple%20google`
3. When the user then clicks Apple again, it will toggle off in the URL and the URL will be `?brand=google`

Treat this algorithm as if you're just working on an array and taking items on and off the array. Here are some basic JavaScript functions we used in the solution that you might need:

```js
myString.split(',') // Turn a string into an array, split by commas
myString.toLowerCase() // Lower-cases a string
myArray.join(',') // Turn an array into a string, joined by commas
Array.isArray(myArray) // Returns true if the array is an array
myArray.filter(fn) // Returns a new array based on the filter function. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
myArray.concat(newValue) // Similar to push but this returns a new array with the value added

// URLSearchParams is a web standard for CRUD operations on the URL search params.
// It returns an object that we can do methods on (see below)
const search = new URLSearchParams('a=b&foo=bar')

// We can also get this object from new URL:
const search = new URL('https://site.com?a=b&foo=bar').search

// We can also get this object from `useSearchParams` which returns
// the same search object based on what's currently in the URL
const [search] = useSearchParams()

// Getters and setters
search.set('brand', 'google')
const brand = search.get('brand')

// Delete
search.delete('brand')

// Serialize the search object into a string
search.toString()
```

Additional Help:
https://medium.com/swlh/urlsearchparams-in-javascript-df524f705317
