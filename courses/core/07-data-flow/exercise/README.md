# Data Flow

## Task One: Track the form state in `Checkout` for populating `CheckoutBilling` on revisits

Hint! When you view this exercise in the browser, make sure you add something to your cart first.

The checkout flow is three pages and the Billing/Shipping form is the second of those three. When the form is submitted, we need to track that information until later when the user is on the last review page and they're ready to submit their transaction. We also need to keep the form information around in case the user goes back to the form and we want to re-populate it.

1. Open `Checkout.js`.
2. Create two pieces of state `sameAsBilling` and `fields` - decide if you want to use `useState` or `useReducer`.
3. In `Checkout` you'll find a `handleBillingSubmit` that gets called when the form is submitted. Use that to persist the form's state into your newly created state in `Checkout`.
4. In `Checkout` there is a route for `CheckoutReview`. That component takes two props: `fields` and `sameAsBilling`. Pass those props in and try filling out the form and then seeing if you can go to the review page to see the state get there.
5. If it works, conditionality make the route for `CheckoutReview` so that the route is only available if `fields` has data. In other words, you shouldn't be able to hard-link over to the path `/checkout/review` if you haven't filled out the form. You can use this for the condition:

```js
// One way to determine the number of properties on an object is
// to create an array of the keys (properties) of the object and
// then get the length of that array:
Object.keys(fields).length > 0
```

# Task Two: Re-populate the form

If the user submits the form and then goes back to it, we need to re-populate its fields with whatever the user typed.

1. Open `CheckoutBilling.js`.
2. Create a prop that will be passed in called `defaultFields` and `defaultSameAsBilling`
3. Use those to seed the initial state of the reducer's state.
4. Pass those props in from the parent `Checkout`.
5. Make sure you can re-visit the form and that it gets populated.
