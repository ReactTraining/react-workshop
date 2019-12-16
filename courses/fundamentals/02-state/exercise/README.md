# State

## Task: Program the 'Add to Cart' button:

1. Open `BrowseProductItem.js`.
2. Create some state called `inCart`. When the button is clicked, toggle the boolean from `false` to `true`
3. Only show the `Quantity` picker and the number after the product name if `quantity` is bigger than 0.
4. When `inCart` bigger is `true`, change the button's label to be 'Checkout' and give it an icon. As a bonus, you can also add a `className` to the button for `cta-button` which changes it's color. CTA stands for "Call to Action"

So far everything might seem like it works fine. But notice what happens when you use the Quantity picker to go down to 0. The parent component (`BrowseProductItem`) still says it's in the cart. We'll fix this in the next step:

5. In `BrowseProductItem`, we can pass down an `onChange` to `Quantity` which is a function that will get called when `Quantity` changes. When the function is called, it will be given the recent `quantity` as an argument. It could look like this:

```js
<Quantity
  onChange={quantity => {
    // finish what goes here
  }}
/>
```

From here, you can finish the code by updating `inCart` to be `false` when `quantity` is 0.
