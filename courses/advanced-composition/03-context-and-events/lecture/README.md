# Notes for Instructor

Before Refactor:

❌ Can't add extra DOM container among the buttons, panels, or items.
❌ The way we refactored using `React.cloneElement` means that we could experience prop collisions with the owner. And mixed with how we're forwarding props means that we're sending props to DOM elements we didn't mean to. Can be fixed but it's a little bit of a pain.
❌ We don't know the state of `Accordion` in the owner. So we can't change an icon depending on open or not.
❌ What if the owner wants to pass their on `onClick` to `AccordionButton`? How do we mix that with our onClick and how do we honor their `event.preventDefault` if they do one?

Refactor:

- Move to Context
- Allow owner to pass `onChange` to `Accordion`
- Allow owner to pass `onClick` to `AccordionButton`
  - Wrap events

Either explain context in terms of Compound Components from the start or write some ad-hoc code to explain it -- maybe using a more conventional "global state" application hierarchy of components and then come back around to compound components.

After Refactor:

✅ ❌ Can have extra DOM containers except for around `AccordionItem` because `Accordion` still uses `cloneElement`.
✅ No more prop collisions or sending unwanted props to DOM.
✅ We can sync state to the owner with `onChange`.
✅ We can give the own the ability to pass their own onClick.

```js
function App() {
  const [index, setIndex] = useState(0)

  return (
    <Accordion onChange={setIndex}>
      <AccordionItem>
        <AccordionButton>
          {index === 0 ? <FaAngleDown /> : <FaAngleRight />}
          <span>What is ARIA?</span>
        </AccordionButton>
        <AccordionPanel>
          A way to make web content more accessible: "Accessible Rich
          Internet Applications".
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          {index === 1 ? <FaAngleDown /> : <FaAngleRight />}
          <span>What does "a11y" stand for?</span>
        </AccordionButton>
        <AccordionPanel>
          A11y is short for "accessibility" since there are 11
          characters between "a" and "y".
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
```
