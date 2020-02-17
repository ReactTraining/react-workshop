Check the fundamentals for this https://twitter.com/sophiebits/status/1228942768543686656

# Stuff left to do

- now we're going to build in useId earlier

  - This is now built into all the disclosures
  - need to do the accordions (I did 02, not final on Sat) , tab final (05), and 06

- DisclosureButton was supposed to have a ref so onClick it could focus. See real one

# 04

- Lecture
  - End with adding `multiple` and `collapsible` stuff

# 06 Popups and Keyboard Events

- Lecture is menu button
  - Add lost focus: In the real menu file it's like 828
- Exercise with Tabs
  - keyboard events for left and right on tabs
  - would be cool if each tab in the panel had disclosure and menu button elements

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
