# Student Learning Notes

You're encouraged to take notes, but we don't want that to get in the way of listening to the lectures. So, we made notes for you. Feel free to edit as you wish!

---

## Lesson: Rendering

- A component is a function that "returns JSX"
- JSX is just syntax sugar for function calls
- JSX is a way to declaratively describe "what" we want the DOM to be
- Babel compiles JSX to function calls (or TypeScript is the compiler if using .tsx)
- In a typical React application, using `ReactDOM.createRoot()` to mount the application is used once. When components in our tree re-render and provide new instructions form JSX, React will take care of updating the DOM for us.
- Component names must start with a capital letter because JSX with a lower-case letter will make DOM and JSX with a capital letter will refer to our component
- Props are just arguments passed into our components that look like XML or HTML attributes
- The "children" prop is passed between the opening and closing tag of a component
- Events can be added to the DOM through special event props on the JSX like `onClick`

Docs: https://react.dev/learn/writing-markup-with-jsx

JSX Confusing Parts: https://reacttraining.com/blog/jsx-the-confusing-parts/

---

## Lesson: State

- State can be considered any variable that changes over time in the component.
- `useState` Format: `const [value, setValue] = useState(defaultValue)`.
- The entire component re-renders (the component function gets called again) each time state changes.
- Multiple state values are done with multiple `useState` or can combined into one ` useState`` if we want to use an object like this:  `useState({ name: 'Dave', age: 40 })`
- We can provide an array of JSX but we have to supply a "key" prop
- We can use [].map to iterate over arrays to make arrays of JSX
- The order of hook declarations matters to React, so we can't "conditionalize" calls to `useState`
- State flows down the React tree not up it. This is called uni-directional data flow
- A good mental model for React is that UI is a function of state. In other words:

  - The component renders for the first time and JSX is created from initial props and state.
  - When state changes (often times through events like clicks), React calls our component function again and ensures the state variables reflect what was changed.
  - This re-render will mean new JSX that is returned reflects the new state. It's like a new instruction manual for what does change in the DOM.
  - React takes the previously returned JSX and the new JSX and finds the differences (called a diff). Only the things that are different are used to change the real DOM. This makes React very fast.

- Docs: https://react.dev/reference/react/useState

## Lesson: Routing

Please see the docs at: https://reactrouter.com

Sometimes things change and we wouldn't want our notes here to become outdated. Their docs are fantastic. There's also really good docs for migrating from earlier versions of React Router to more modern ones.

## Lesson: Forms

- Form fields in React are either "controlled" or "uncontrolled".
- By default, fields are "uncontrolled". This means that React is not controlling the value of the field. The user types into the field and whatever they type is the value (just like any HTML form made in the last 25 years). It's "uncontrolled" because React is not controlling the value.
- If we use our state as the `value` for a field, then it's controlled. Otherwise it's uncontrolled.
- If form fields have a `name` prop, we can retrieve uncontrolled form values by doing this in the submit event:

```js
// Usage: <form onSubmit={onSubmit}></form>
function onSubmit(event) {
  event.preventDefault() // prevents default form behavior
  const formData = new FormData(event.currentTarget)
  const plainObject = Object.fromEntries(formData)
}

// React 19
// Usage: <form action={formAction}></form>
async function formAction(formData) {
  const plainObject = Object.fromEntries(formData)
}
```

- Docs for controlled inputs: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable

---

## Lesson: Hooks

- A "ref" in React is a reference to a consistent object obtained by `useRef()`
- We can pass that ref to a DOM node like this: `<div ref={ref}></div>`
- Or we can treat the object as mutable (make edits to it that will persist to the next renders kinda like state does)
- refs can also be used to access data on form submissions of uncontrolled fields
- useId is a hook to give us an app-wide unique id usually for HTML id's to be unique for accessibility
- useEffect is a hook for running side-effect code after the component renders
- useMemo is a hook to "memoize" a value while rendering. In other words "remember" a value so it does't have to be re-computed again on every render. Only compute it again if the useMemo dependency array changes
- React.memo (or just memo) is for memoizing function components so they get less re-renders. A memoized component will not be subject to re-rendering when the component above it (called the parent or owner component) re-renders unless the props being passed into the memoized component changes.

```js
// ✨ Note that the React Compiler (available as an option for React 19) can apply all three
// of these for you automatically.

// useMemo calls the fn in the render phase (synchronously) and "memoizes"
// the return value as x in this example based on the input of the dep array.
// This is mostly used for:
// 1. performance - memoizing the return value a slow function
// 2. stabilizing objects and arrays that will end up in other dependency arrays
// 3. stabilizing objects and arrays that will be passed as props to memoized components (see below)
const x = useMemo(fn, [])

// useCallback never calls the fn passed in. Instead it "memoizes" the function itself
// by stabilizing it and returning it. This is mostly used for:
// 1. stabilizing functions that will end up in other dependency arrays
// 2. stabilizing functions that will be passed as props to memoized components (see below)
const fn = useCallback(fn, [])

// The memo() function enhances the component so that it itself is memoized and
// will not re-render due to it's owner getting a rerender unless that owner passes new props
const MyComponent = React.memo((props) => {
  // your code
})
```

- Docs for useRef: https://react.dev/reference/react/useRef
- Docs for useEffect: https://react.dev/reference/react/useEffect
- Docs for useId: https://react.dev/reference/react/useId
- Docs for useMemo: https://react.dev/reference/react/useMemo
- Docs for memo: https://react.dev/reference/react/memo

## Lesson: Data Fetching

- `useEffect` is for doing side-effects after render phases (after the JSX has created DOM)
- The `useEffect` function gets called after the first render, then after any where where the dependency array variables change:

```js
useEffect(fn) // runs when a component mounts, and on any re-render
useEffect(fn, []) // runs just when a component mounts
useEffect(fn, [some, example, state]) // runs when a component mounts, and when `some` or `example` or `state` changes.
```

- Passing objects, functions, and arrays into the dependency array will mean they need to be stable. Some will already be stable but if they're not, we need to use `useMemo` (for objects/arrays) and `useCallback` (for functions) to make them stable.
- The `useEffect` function can return a function which is called a "cleanup"
- The cleanup gets called when the component unmounts or if we switch side effects because the dep array changes
- Here's a visual of when different parts of useEffect execute

```js
useEffect(() => {
  // 1. The effect first runs so we'll say it's "current"
  let isCurrent = true
  // 2. Go out and get a user on the network
  fetchUser(uid).then((user) => {
    // 5. A moment later, the promise does resolve (the component
    // is no longer mounted though). This condition will prevent us
    // from setting state on an unmounted component.
    if (isCurrent) {
      setUser(user)
    }
  })
  // 3. Here is a function that can be called if we need to
  // cleanup the effect
  return () => {
    // 4. Lets imagine the user leaves the page before the fetchUser
    // promise resolves. This cleanup will be called and set isCurrent
    // to be false.
    isCurrent = false
  }
}, [uid])
```

- https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/
- https://reacttraining.com/blog/when-to-use-functions-in-hooks-dependency-array/
- https://reacttraining.com/blog/setting-state-on-unmounted-component
- https://reacttraining.com/blog/useEffect-cleanup
- https://reacttraining.com/blog/hooks-you-probably-dont-need
- Docs: https://react.dev/learn/synchronizing-with-effects
- Docs: https://react.dev/learn/you-might-not-need-an-effect

## Lesson: Data Fetching with React Query

React Query is a professional cache-based data fetching abstraction so you don't have to make your own. It's also very well known and battle-tested. This could be our `useCourses` instead:

```js
function useUsers() {
  const { data, ...rest } = useQuery('users', () => api.users.getUsers(), {
    staleTime: 1000 * 30,
  })
  return { data, ...rest }
}
```

- An excellent guide: https://tkdodo.eu/blog/practical-react-query.

## Lesson: Context

- "Uni-directional Data Flow": React's data model is said to be "uni-directional", meaning data flows from parent components down through the tree to child components through props.
- When components need to communicate with other components far away in this tree structure, one solution has been to "lift state" high enough to flow the information down to both components. But this could lead to many levels of "prop drilling" -- the process of passing props deep through the component hierarchy.
- Context is a way to pass data around our app without having to prop drill.
- Context gives us a `<Context />` component which we can add to the same component that contains the state. Then instead of passing props down through the normal hierarchy, we can pass a `value` into the provider JSX.
- When values are passed into the provider's `value` prop, they can be received at any component below the provider with the `use` hook. Components using this hook are referred to as "consumers" of the context.
- When the state changes at the top and is passed down into the provider, the consumers get a re-render to retrieve that new state.
- Context is commonly a solution for global state for things like authentication, shopping carts, theming, etc...

- Docs: https://react.dev/learn/passing-data-deeply-with-context
- TypeScript and Context: https://reacttraining.com/blog/react-context-with-typescript

## Lesson 8: Testing

- Be sure to see the GUIDE.md in the testing folder for information on setting up unit testing
- The main principal of React unit testing is - Test the component the way the user uses it, not the implementation details of the component.
- In other words, `render(<Comp />)` render the component in the test and issue events onto the component similarly to how the user clicks, submits forms, or uses keyboard events on the component. Then observe the fake DOM in the unit test to see if the component renders what you'd expect. The "fake DOM" is orchestrated through Jest and JSDOM.
- Mock out (with Jest) the React-tree architecture above your component (Context, Redux, etc) or environmental things like the URL, and mock out sub (child) components. This allows you to test your component in isolation.
