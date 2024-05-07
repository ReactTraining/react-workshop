# Notes for Instructor

The important parts of the descendants API are:

```js
// Create a context
const DescendantContext = createDescendantContext('DescendantContext')

// In the root component, create state for descendants
const [descendants, setDescendants] = useDescendants()

// In the root, create a descendant provider
<DescendantProvider
  context={DescendantContext}
  items={descendants}
  set={setDescendants}
></DescendantProvider>

/**
 * IN ACCORDION ITEM
 */

const itemRef = useRef()

// Now we can register our descendant and get our index
const index = useDescendant({
  context: DescendantContext,
  element: itemRef.current
})
```

Docs - https://github.com/reach/reach-ui/blob/develop/packages/descendants/README.md
