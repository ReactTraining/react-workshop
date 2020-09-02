# API Design

HTML5 `<details>` "disclosure"

- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details

# Task: Create `<Disclosure />`

Create a custom React component similar to the HTML5 `<details>` -- a button that controls the visibility of some content which we'll call the "panel". Note, you should use ordinary `div` elements since we'll be programming our own behavior, but eventually it will function just like `<details>` and `<summary>` with accessibility.

Specifications:

- At first, only a button is visible and the panel is hidden.
- The App should be able to pass the contents for the button.
- The App should be able to pass the contents for the panel.
- When the button is clicked, the panel becomes visible.
- The button is a "toggle" which when clicked repeatedly will toggle the visibility of the panel.
- There should also be a arrow icon pointing right if the disclosure is closed or down if it's open.

The icons you should use will be:

```js
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
```
