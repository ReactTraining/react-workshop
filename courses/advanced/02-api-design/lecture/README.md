# Notes for Instructor

The advanced workshop starts with the attendees writing code first. Start with the exercise and have the students follow the README.

When they're finished, this is a great opportunity to have a discussion on the various ways that they may have implemented the `Disclosure` component. Many students will probably create an API with one element like:

## Before Refactor:

```jsx
<Disclosure summary="Click Me">Panel Info</Disclosure>`
```

❌ No ARIA.
❌ We can't rearrange to put the panel above the button or side-by-side.
❌ We can't add extra DOM container among the button and/or panel (like a `div` around the button).
❌ We can't pass the underlying button own props (like className, id, etc) unless we do strange API things like `buttonProps={}`
❌ We can't forward refs to the panel or button. Even if we did do `forwardRef`, how would we know what element it goes to?
❌ We don't get to choose the icon or its position (to the left or right of text). Or what if we want no icon?

## Refactor:

- Compound Components using `React.cloneElement` approach
- Use data-attributes instead of classnames so that way a forwarded prop for `className` won't clobber ours. Also so we don't pollute the global CSS namespace.
  - `data-disclosure-button` and `data-disclosure-panel`
  - `data-state="open|collapsed"`
- Add `displayName` -- Devtools just says `<ForwardRef/>` or "Anonymous" (depending on version).
- Add some basic a11y, see final solution for example:
  - `aria-controls`
  - `aria-expanded`

In order for a unique ID to go on the panel which then gets used by `aria-controls` for the button, we need to manage the ID at the top of the Compound Component and pass it down through context. Also we need to plan on there being other instances of Disclosure so we need a universal "unique id" system. This is what `useId` does for us. Read all about it here: https://github.com/reach/reach-ui/tree/master/packages/auto-id

We have a local implementation of `autoId` which is being imported. It might be fun to just make your own for the purposes of this lecture (without all the SSR stuff), but all other material uses the local one at the root of `/advanced`.

## After Refactor:

✅ Basic ARIA is in place.
✅ We CAN change the arrangement: `<DisclosurePanel />` before `<DisclosureButton />` if we want.
✅ We CAN pass in our own props in a way that feels more natural without a sloppy API.
✅ We CAN forward refs
❌ Even though we can compose an icon into the button, we don't know the state of `Disclosure` so we can't change the icon depending on open or not.
❌ Still, we can't add extra DOM containers around the compound component elements.

Note that a `span` element around the text summary is necessary for good vertical-alignment with CSS:

```jsx
// Not needed if no icon
<DisclosureButton>
  Click Me
</DisclosureButton>

// Does not align well
<DisclosureButton>
  <Icon />
  Click Me
</DisclosureButton>

// Aligns well
<DisclosureButton>
  <Icon />
  <span>Click Me</span>
</DisclosureButton>
```

### Exercise

Let the attendees refactor to get caught up to where we have our lecture code. Main lesson learned: React gives us the ability to make a composable API which offer more flexibility.
