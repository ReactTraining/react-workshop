# Notes for Instructor

## Before Refactor:

❌ Accordion cannot be "controlled" from the owner's state

## Refactor

- Add an `index` prop to `<Accordion index={index} />` so it can be controlled.
- Do a `console.warn` when the owner changes from controlled to uncontrolled and vice versa (this shouldn't be allowed)
- A good use-case for controlled-components in this case is an FAQ where one panel and have a button or link that opens another panel.

## After Refactor

✅ Accordion can be "controlled" from the owner's state
