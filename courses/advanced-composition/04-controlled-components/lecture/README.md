# Notes for Instructor

1. Lecture

- Add an `index` prop to `<Accordion index={index} />` so it can be controlled.
- Do a `console.warn` when the owner changes from controlled to uncontrolled and vice versa (this shouldn't be allowed)
- A good use-case for controlled-components in this case is an FAQ where one panel and have a button or link that opens another panel.

For fun, you can also show how render-props would also give us the ability to know the internal state of Accordion, we can use that to toggle the icons for example. But this is where the tradeoffs of render props and controlled components shows up. If the button for learning more about a11y is on the outside of `<Accordion>`, then render-props don't work. if it's on the inside, like say in the first panel, then render props is fine.
