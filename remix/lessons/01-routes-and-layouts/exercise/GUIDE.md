# Routes And Layouts

The goal of this exercise is to make files for these routes:

```js
// URL                               LAYOUTS         CONTENT
// localhost:3000                    DefaultLayout   "Home Page"
// localhost:3000/contact            DefaultLayout   "Contact"
// localhost:3000/auth/login         AuthLayout      "Login"
// localhost:3000/auth/register      AuthLayout      "Register"
// localhost:3000/products           ProductsLayout  "Browse Products"
// localhost:3000/products/1         ProductsLayout  "Product Profile: 1"
// localhost:3000/products/special   ProductsLayout  "Special Product Profile"
```

## Task 1

We have already provided three "layout" components for you in `templates.tsx`. They are color coded so each type of layout looks different. They are Gray, Green, and Blue. Each component needs to be converted to its own file in accordance with the URL scheme above. For example, if you visit `/products`, you should see a page loaded into the `ProductsLayout` and the page should say `<h1>Browse Products</h1>`. Then you can see there are two other pages that also use that same layout for when you visit `/products/1` and `products/special`. This all means you'll need for files, one for the layout and three for the pages.

By the time you're done, you should have removed the original `_index.tsx` and `templates.tsx` files as they do not conform to the URL scheme, they're just to get you started.

Here's an example "Page" component. This is about what you'll need for most pages

```tsx
// You could name it Page or any name you like
export default function Page() {
  return (
    <div>
      <h1>Browse Products</h1>
    </div>
  )
}

// Or you could make it an anonymous function
export default function () {
  return (
    <div>
      <h1>Browse Products</h1>
    </div>
  )
}
```

## Final

Remember, for this and all exercises, there's a `final` version for you to review if you need to with all the answers. In this case, the final is in `exercise-final`
