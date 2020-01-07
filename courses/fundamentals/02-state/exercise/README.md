# State

## Task: Program the 'Add to Cart' button:

1. Open `BrowseProductItem.js`.
2. Create some state called `quantity` with an initial value of `0`.
3. When the "Add To Cart" button is clicked, change the quantity to be `1`
4. When `quantity > 0`, show the `<Quantity />` picker, otherwise don't show it.
5. Also when `quantity > 0`, change the button's label to be 'Checkout' and give it an icon. As a bonus, you can also add a `className` to the button for `cta-button` which changes it's color (CTA meaning "Call to Action").
6. When quantity is showing, the user should be able to update the quantity as they need to. When they do, the new quantity will be given to you as an `onChange` callback function

```js
<Quantity
  onChange={quantity => {
    // finish what goes here
  }}
/>
```

The "finish what goes here" comment wants you to update the `quantity` state when `<Quantity>` changes
