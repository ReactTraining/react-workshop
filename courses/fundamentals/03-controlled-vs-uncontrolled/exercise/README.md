# Controlled vs Uncontrolled

Tip: Remember, a field is said to be "controlled" if it has a `value` prop (which means it also needs an `onChange`). However, in some cases a field could have an `onChange` without a `value` prop and that would NOT be considered "controlled" since it doesn't have a `value` prop.

## Task:

1. Open `CheckoutBilling.js`. This file is in almost the same ending point as the final for the state exercise. The only difference is that it doesn't hide the shipping form when `sameAsBilling` is `true`.
2. Instead of hiding the shipping information, disable the fields using the `disabled` prop if `sameAsBilling` is `true`.
3. Also when `sameAsBilling` is `true`, keep the shipping fields in sync with the state of the billing fields. When `sameAsBilling` is `true`, you should be able to type into the billing fields and see the same value in the respective shipping field.
4. The `fields` variable in `handleSubmit` can get it's value from state now instead of a utility like `serializeForm`.

Hint. The shipping fields need to be "controlled" but do the billing fields need to be?
