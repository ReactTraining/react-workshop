# Keyboard Navigation

We've taken the `Disclosure` component built and composed it to build an ARIA-compliant `Accordion` ... almost!

Accordion is very similar to `Disclosure`, but `Disclosure` represents a standalone collapsible section, Accordion is a group of collapsible sections with related content.

The biggest difference as far as functonality goes is that with an accordion, when focus lands on an accordion button, you should be able to move focus to the previous/next button using the directional arrow keys instead of `Tab`. So, `ArrowUp` should move the focus to the previous accordion item's button, and `ArrowDown` should move focus to the next.

Your job: implement keyboard navigation outlined in the ARIA design pattern:

- https://www.w3.org/TR/wai-aria-practices-1.2/#accordion
- https://www.w3.org/TR/wai-aria-practices-1.2/examples/accordion/accordion.html

## Hints

1. If you get stuck, you can probably get some ideas from the `Select.final` code from our lecture 👀
2. Note that one difference between this exercise and our `Select` implementation is that our context that holds data about our accordion items holds the value as well as the element. This should make it easier to handle focusing after you retrieve the item from the list.
3. Check the bottom of the file for some utilities that may come in handy!
