# Notes for Instructor

1. Lecture

- Use context inside of the `React.Children.map` so each `<AccordionItem>` has it's own context provider
  - This solves the first two problems in the checklist
- Allow the owner to pass in its own onClick to the `button`
  - Now we have to manage the owners and our event. Use `wrapEvent`:

```js
function wrapEvent(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event)
    if (!event.defaultPrevented) {
      return ourHandler(event)
    }
  }
}
```
