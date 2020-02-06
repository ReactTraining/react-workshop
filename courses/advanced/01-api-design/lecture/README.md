# Notes for Instructor

The advanced workshop starts with the attendees writing code first. Start with the exercise and have the students follow the README.

When they're finished, this is a great opportunity to have a discussion on the various ways that they may have implemented the `Disclosure` component. Many students will probably create an API with one element like:

```jsx
<Disclosure summary="Click Me">Panel Info</Disclosure>`
```

## Lecture

😩Problems:

- We can't change the arrangement to flip the order of panel and button (without some complex API and prop changes).
- We can't choose to add extra DOM among the button and/or panel (like a `div` around the button).
- We can't pass the underlying button its own props (like className, id, etc) unless we do some nasty prop forwarding with `buttonProps={}`
- Currently we can't forward refs to the panel or button. Even if we did do `forwardRef`, what element would it go on?
- We don't get to choose the icon, and even if we made it so we could pass in the icon's as props, it would be difficult to setup the API so we could choose where it goes. Maybe someone wants it at the end of the button.

🛠Refactor to Compound Components. See `Disclosure.final.js`

Things to remember:

- When we forward the props, things like `className` or `hidden` it clobbers ours. So we refactor to data-attributes instead of `className` and we'll deal with the `hidden` part in a later lecture.
- Devtools just says `<ForwardRef/>` or "Anonymous" (depending on version). So be sure to add `displayName`

😄The Refactor fixes:

- We CAN change the arrangement: `<DisclosurePanel />` before `<DisclosureButton />` if we want.
- We CAN pass in our own props in a way that feels more natural without a sloppy API.
- We CAN forward refs
- We CAN choose the icon now and its relative position to the button's text by passing it in as `children`

### Exercise

Let the students refactor to get caught up to where we have our lecture code

Main lesson learned: React gives us the ability to make composable API's

😩Remaining Problems:

- Still, we can't choose to add extra DOM among the button and/or panel.
