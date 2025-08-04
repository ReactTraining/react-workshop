# Forms and Actions

First, review the loader of `root.tsx`. This loader gets the cart data now. Before in the lecture, the cart data was loaded down lower in the loader of `_products-layout._index.tsx`. By "lifting" the loader data, we have access to the cart in the entire UI of our app, not just in that page. When you are able to add items to the cart, you'll notice the "Cart is Empty" message start to change.

# Task 1

Get the "Add to Cart" button working. Right now, most of the work is done regarding the action function. The task is to get the buttons to submit data to the action with the correct quantity.

1. Wrap each button in a `<Form>` (notice the capital "F")
2. Include a hidden input field to send the appropriate `product.id`. Remember to include a `name` and `value`
3. Include a hidden input field to send a `quantity` also. Make the value for the quantity one greater than the current `quantityInCart` value for that item.
4. If the method(s) of your forms match what the action expects, and if the hidden field name and value matches, you should be able to add items to the cart and see a visual indication in the UI.

Make sure adding to the cart works before you continue

Keep in mind that when you send data to an action, you're also telling Remix to then run all the loaders that match the same path - this is called "revalidation". The root loader will load the latest cart information after each "add" and will propagate that new cart information down to all the components that need it. This is already done for you but be sure to explore it.

# Task 2

When the app gets bigger, we'll want a more general route for the cart action -- not the file it's in now

1. Move the action in `products-home.tsx` and its dependencies (imports) to a new file at `routes/cart.tsx`.
2. Refactor your `<Form>` components to have an action prop that points to this new path. By default, the lack of an action told Redux to send your data to the same path you're on which is why you didn't need an action before.
3. Refactor the `<Form>`s to be `<fetcher.Form>` instead.
4. You'll need to call `useFetcher` to get a `fetcher` object which replaces `useNavigation`

Example: `<fetcher.Form method="post" action="/cart">`

Make sure adding to the cart works before you continue

# Task 3

1. Move the two buttons and their forms to the `components/CartButtons.tsx` file. We'll use this file to export any cart/button related components (two components for now).
2. Some of the work in `CartButtons.tsx` has been done for you. Once you get the code moved, you should make sure it still works and you can add to the cart before you continue.
