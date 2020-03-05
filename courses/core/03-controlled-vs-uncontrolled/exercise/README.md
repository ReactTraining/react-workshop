# Controlled vs Uncontrolled

Tip: Remember, a field is said to be "controlled" if it has a `value` prop (which means it also needs an `onChange`). However, in some cases a field could have an `onChange` without a `value` prop and that would NOT be considered "controlled" since it doesn't have a `value` prop.

Also, did you remember to shut down the exercise from #2 and start #3? Easy mistake since the exercises are on similar UI.

## Task:

1. Open `CheckoutBilling.js`. This file has almost the same ending point as the final for the state exercise we did earlier. The only difference is that it doesn't hide the shipping form when `sameAsBilling` is `true`.
2. Instead of hiding the shipping information, disable the fields using the `disabled` prop if `sameAsBilling` is `true`.
3. Also when `sameAsBilling` is `true`, keep the shipping fields in sync with the state of the billing fields. When `sameAsBilling` is `true`, you should be able to type into the billing fields and see the same value in the respective shipping field.

Hint. Each form field should have it's own `useState` state. If you try to use one `useState` with an object for all the fields at once (mimicking the older class-based React), you might run into problems. Ask the instructor for more details on this if you're interested.

4. The `fields` variable in `handleSubmit` can get it's value from state now instead of a utility like `serializeForm`. See the solution if you're not sure what this means.

Hint. The shipping fields need to be "controlled" but do the billing fields need to be?
