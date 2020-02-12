# Notes for Instructor

## Explaining Context

- You can explain it in terms of Compound Components from the start.
- Another idea is to write some ad-hoc code that might resemble an application hierarchy of components and to talk about application state using context. Then explain it with compound components.

## Context with Compound Components

Open `index.js` and `Menu.js`

`Menu` works, but it's still missing lots of things that we'll teach later in the workshop. The main idea is that it's very similar to `Disclosure` in terms of its technique.

- Familiarize the class with `Menu`
- Review the shortcomings of not being able to arbitrarily wrap containers around things like `MenuItem` since iterating and `cloneElement` are sensitive to the hierarchy.
- Refactor to context and useReducer (lets not get into state machines just yet).
