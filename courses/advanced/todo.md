# Stuff left to do

# 04

- Lecture
  - End with adding `multiple` and `collapsible` stuff

# 06 Keyboard Accessibility

- Lecture is menu button
  - Add lost focus: In the real menu file it's like 828
  - keyboard events for navigating up and down the menu items
- Exercise with Tabs
  - keyboard events for left and right on tabs
  - would be cool if each tab in the panel had disclosure and menu button elements

# 07 Reusable ARIA

- Lecture only
  - useId
  - useDescendent(s)
  - The "as" prop

Random notes

- Need to add dynamic id thing to according staring in final solution for 2 (and exercise)
- tab-index="-1" on the panels of accordion and disclosure should be a conversation for keyboard events
- The panel of accordion has a `role="region"` but the panel for disclosure doesn't - this is correct

```js
let id = 0
const getId = () => ++id

function useId() {
  const { current: id } = useRef(getId())
  return id
}
```
