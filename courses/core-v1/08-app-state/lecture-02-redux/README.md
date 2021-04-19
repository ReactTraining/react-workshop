# Notes for Instructor

The starting base for this lecture uses the `.final` files from the context lecture, but we will refactor it to use Redux instead of context to manage our app state for our auth and shopping cart.

We use `@reduxjs/toolkit` to create and configure our store, but note that it's just a wrapper around Redux's `createStore` that reduces some boilerplate for us. Redux toolkit has a lot of other great tools you can use to simplify your redux implementation, but we don't cover the full package in this workshop. https://redux-toolkit.js.org/introduction/getting-started
