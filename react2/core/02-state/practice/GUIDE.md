# State

## Goals

Allow the user to fill out the "Shipping & Billing" form without having to duplicate their inputs when "Same as Shipping" is checked.

1. If the checkbox is unchecked, the user will have to type both shipping and billing info
2. If the checkbox is checked, the user will see the billing info populate as they type into the respective field of the shipping info.

## Task 1

There is already state for `isSame`. Get the checkbox programmed with an `onChange` event to toggle this boolean state

## Task 2

Create two states for `billingName` and `billingAddress`. Make these input fields controlled in a way where the `value` of each one is either the billing or shipping information depending on `isSame`.

## Finished When

You're finished when the form can be submitted and there is a `console.log` that outputs the form values that we want to submit.
