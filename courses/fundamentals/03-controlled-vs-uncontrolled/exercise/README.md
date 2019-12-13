# Controlled vs Uncontrolled

Tip: Remember, a field is said to be "controlled" if it has a `value` prop (which means it also needs an `onChange`). However, in some cases a field could have an `onChange` without a `value` prop and that would NOT be considered "controlled" since it doesn't have a `value` prop.

# Task:

1. Open `CheckoutBilling.js`.
2. First make the `sameAsBilling` variable stateful and make it respond to the checkbox's `onChange`.
3. When the `sameAsBilling` checkbox is `false`, the user should be able to type into all the fields.
4. When the checkbox is `true`, keep the shipping fields in sync with the state of the billing fields. The shipping fields should be `disabled` if `sameAsBilling` is `true` (`disabled` is a prop you can use)

Hint: If the user types something into shipping, then checks the checkbox, then unchecks the checkbox, ensure the field has the information from before clicking the checkbox the first time.

# Bonus:

Instead of disabling the shipping information when `sameAsBilling` is `true`, use the `sameAsBilling` to determine if we even mount the shipping part of the form (to make it hidden).
