# Routes And Layouts

The goal of this practice is to make files for these routes:

```js
// URL                               SUB LAYOUT      CONTENT
// localhost:3000                    CommonLayout    "Home Page"
// localhost:3000/contact            CommonLayout    "Contact"
// localhost:3000/auth/login         AuthLayout      "Login"
// localhost:3000/auth/register      AuthLayout      "Register"
// localhost:3000/products           ProductsLayout  "Browse Products"
// localhost:3000/products/1         ProductsLayout  "Product Profile: 1"
// localhost:3000/products/special   ProductsLayout  "Special Product Profile"
```

## Task 1

We have already provided all the route files for you that you wont have to edit. Each page has a sub-layout that is color-coded as follows:

Gray - Common Layout
Green - AuthLayout
Blue - Product Layout

There is also a MainLayout implemented in the root file.

Here's an example of the nesting that we're making assuming you're on a page for products:

```jsx
<MainLayout>
  <ProductLayout>
    <Page />
  </ProductLayout>
</MainLayout>
```

For example, if you visit `/products`, you should see a page loaded into the `ProductsLayout` and the page should say `<h1>Browse Products</h1>`. If you visit `/products/1` and `products/special`, these would utilize the same `ProductsLayout`.

## Final

Remember, for this and all practices, there's a `final` version for you to review if you need to with all the answers. In this case, the final is in `practice-final`.
