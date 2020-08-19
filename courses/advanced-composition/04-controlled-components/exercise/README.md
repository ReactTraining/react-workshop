# Controlled Components

# Task One: Implement controlled components by passing `index`

- Add an `index` prop to `<Disclosure index={index} />` so it can be controlled.
- Do a `console.warn` when the owner changes from controlled to uncontrolled and vice versa (this shouldn't be allowed)

Remember:

```jsx
// Uncontrolled
<Disclosure />

// Uncontrolled, even though we want to know the state
<Disclosure onChange />

// Controlled
<Disclosure open onChange />
```
