# State

## Task: Implement "Same as Billing"

1. Open `CheckoutBilling.js`.
2. Make the `sameAsBilling` boolean stateful with `useState`
3. When the checkbox is checked, toggle the `sameAsBilling` state. Checkboxes have an `onChange` event.
4. Use the `sameAsBilling` value as the `defaultChecked` of the checkbox
5. Hide the shipping fields if `sameAsBilling` is `true`. Use JSX conditional logic to do so, for example:

```jsx
// The form-field is only mounted if `sameAsBilling` is false
<div>
  {!sameAsBilling && (
    <div className="form-field">
      <label htmlFor="shipping:name">Name</label>
      <input id="shipping:name" type="text" name="shippingName" />
    </div>
  )}
</div>
```
