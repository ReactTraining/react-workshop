# State

## Task: Program the 'Add to Cart' button:

1. Open `BrowseProductItem.js`.
2. Create some state for `quantity`. When the button is clicked, set quantity to 1.
3. Only show the `Quantity` picker and the number after the product name if `quantity` is bigger than 0.
4. When there is `quantity` bigger than 1, change the button's label to be 'Checkout' and give it an icon.

Notice that the Quantity picker's state is not aligned to the parent BrowseProductItem's state?

5. Use the `BrowseProductItem`'s state as the state for quantity by passing `quantity` and `setQuantity` down as props.

Now the `Quantity` component can have it's local state removed. It's no longer in charge of it's own state, it will always expect the parent who implements it to pass down state as props.

## Bonus

Lift state again!

1. Open `index.js`
2. Notice what props are being passed down into `BrowseProductItem`? The `App` has been programmed to manage all the shopping cart state in one place.
3. Remove the `quantity` state from `BrowseProductItem` and instead us the `quantity` and `addToCart` props. It might be nicer to do parameter destructuring at this point:

```js
// Go From
BrowseProductItem(props)

// To
BrowseProductItem({ id, name, quantity, addToCart })
```
