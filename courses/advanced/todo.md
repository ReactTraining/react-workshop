Check the fundamentals for this https://twitter.com/sophiebits/status/1228942768543686656

# Stuff left to do

- DisclosureButton was supposed to have a ref so onClick it could focus. See real one
- tab-index="-1" on the panels of accordion and disclosure should be a conversation for keyboard events
- Do we want to do "as"

# 04

- Lecture
  - End with adding `multiple` and `collapsible` stuff

# 06 Popups and Keyboard Events

- Exercise with Tabs
  - How do I make the focus match the selection. In other words, if I am on the second tab and do shift-tab to go to the first, the focus works but the first tab is not selected.

```js
let id = 0
const getId = () => ++id

function useId() {
  const { current: id } = useRef(getId())
  return id
}
```
