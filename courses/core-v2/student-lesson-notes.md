# Student Learning Notes

The workshop has lectures followed by exercises. The exercises are your chance to write code, so we hope you're able to sit back and enjoy the lectures without feeling like you have to code-along at our fast pace. You're encouraged to take notes, but we don't want that to get in the way of listening to the lecture. So, we made notes for you! This is your repo so feel free to make edits.

---

## Lesson 1: Rendering

- We like React because it's Composable and Declarative
  - Composable: You can build small re-usable parts which can be used to build bigger, more complex things
  - Declarative: We write in a style where we say "what" we want. In other words `<StarRatings>` is declarative because we said we want star ratings on the page, but we didn't have to program "how" they work. Whoever did program the internals of `<StarRatings>` programmed "how" they work. All declarative code that we write has imperative code somewhere else that someone else wrote.
- JSX is a syntax for easily creating nested elements. Babel is a Webpack plugin that converts each JSX "tag" into `_jsx('div')`
- The return value of a component (JSX turned into `_jsx('div')`) is like an "instruction manual" for how to create DOM elements.
- In a typical React application, `ReactDOM.render()` is only used once. As React changes our JSX responses from our components, React will also take care of updating the DOM to reflect those JSX changes.
- A function that returns JSX is a "component" in React. There are also older ways of creating components with classes. Function-based and class-based components can intermingle in the same app.

Docs: https://reactjs.org/docs/introducing-jsx.html

JSX Confusing Parts: https://reacttraining.com/blog/jsx-the-confusing-parts/

---

## Lesson 2: State

- `useState` Format: `const [value, setValue] = useState(defaultValue)`.
- State are the variables that change over time in the component.
- The entire component re-renders (the component function gets called again) each time state changes.
- Multiple state values are done with multiple `useState`.
- The order of hook declarations matters to React, so we can't "conditionalize" calls to `useState`
- A good mental model for React is that UI is a function of state. In other words:
  - The component renders for the first time and JSX is created from initial props and state.
  - When state changes (often times through events like clicks), React calls our component function again and ensures the state variables reflect what was changed.
  - This re-render will mean new JSX that is returned reflects the new state. It's like a new instruction manual for what does change in the DOM.
  - React takes the previously returned JSX and the new JSX and finds the differences (called a diff). Only the things that are different are used to change the real DOM. This makes React very fast.

Docs: https://reactjs.org/docs/hooks-state.html

---

## Lesson 3: Forms

- Form fields in React are either "controlled" or "uncontrolled".
- By default, fields are "uncontrolled". This means that React is not controlling the value of the field. The user types into the field and whatever they type is the value (just like any HTML form made in the last 25 years). It's "uncontrolled" because React is not controlling the value.
- There are several ways to access the values of uncontrolled fields, but one common way in React is with refs (useRef)
- Refs are used to access anything in the DOM in a more "imperative" way.
- If we do a `onChange` event for the field and take what the user types and turn that into state, then we take the state and put that back into the field's value prop, then you can say React is controlling the value. Now it's a "controlled" field. Even though it might seem as though the user is still controlling the value, React _could_ adjust, format, or change the value if we program it to do so. So it's really React that's controlling the value the user sees.
- Pros and Cons:

  - Uncontrolled fields are easier to set up because you just type `<input />` and you're done. Whereas with controlled you have to setup the `onChange` and `value` props for the field so that state orchestrates the value of the field.
  - Uncontrolled fields give you less abilities. If you need something else to set the value of the field, then we can't use uncontrolled. Also, if we want to read the value of an uncontrolled field (for form submissions), then we have to figure out a way to read the DOM (probably with refs) whereas controlled fields already have their stateful values ready for us.

- Docs for Refs: https://reactjs.org/docs/refs-and-the-dom.html
- Docs for Controlled inputs: https://reactjs.org/docs/uncontrolled-components.html

### Reducers

```js
// Format:
const [state, dispatch] = useReducer(reducerFunction, initialState)

const [state, dispatch] = useReducer(
  (oldState, action) => {
    switch (action) {
      case 'SOME_ACTION_TYPE':
        return { ...oldState } // make any additional state changes
      default:
        return state
    }
  },
  {
    // initial state
  }
)

dispatch({ type: 'SOME_ACTION_TYPE' })
```

- `useReducer` is the "reducer pattern" similarly found in Redux, but for local state. It's an alternative to using `useState`. `useReducer` can be good for complex local state.
- `useReducer` docs: https://reactjs.org/docs/hooks-reference.html#usereducer

---

## Lesson 4: Data-Fetching (useEffect)

For this document fn = Callback Function

- `useEffect` Format: `useEffect(fn, [dependencyArray])`
- `useEffect` is used for side effects. Typically this means we want to do something outside of our component, like a network request or perhaps with cookies/localstorage, and we want to do that side effect any time state changes.
- The effect callback runs when the component first mounts and then anytime the values in the dependency array change. Having an empty dependency array is a way to ensure the effect only runs once.
- However, be careful, any variables that your effect uses (depends on) need to be stated in your dependency array. With the older mental model of time and `componentDidMount`, we thought in terms of "this just needs to happen once when we mount". But now with `useEffect` we need to think in terms of "anytime state changes, what do I need to do". Therefore you'll probably need to put values in your dependency array often.

```js
useEffect(fn) // runs when a component mounts, and any state changes
useEffect(fn, []) // runs just when a component mounts
useEffect(fn, [some, example, state]) // runs when a component mounts, and when `some` or `example` or `state` changes.
```

- For those who have some React experience, it's easy to compare `useEffect` to things like `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`. However, you might want to consider these differences - https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/
- Avoid infinite loops: If an effect has no dependency array and also sets state, this will cause an infinite loop. Imagine that the component mounts which calls the effect. Then state is changed which leads to a re-render which means the effect will be called again because there was no dependency array telling react not to run the effect again. Then since the effect runs again and sets state, this creates an infinite loop.
- In the callback for the effect, you can either return no value or return a function. If a function is returned, it's said to be the "cleanup function". This function is called when the component unmounts or when the dependency array changes.
- When setting state asynchronously in an effect, there's always a chance the component will become unmounted or the dependency array might change before the set state is called. For both cases, we need to use a cleanup function to ensure we're not setting state on the unmounted component or setting state that was based on the previous values of the dependency array. This is how we might prevent this problem with an `isCurrent` variable:

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
- Docs: "Using the Effect Hook": https://reactjs.org/docs/hooks-effect.html
- A very long but complete guide to useEffect: https://overreacted.io/a-complete-guide-to-useeffect/

---

## Lesson 5: Effects

This is a continuation of lesson 4, but with less of an emphasis on network (data) effects and more on other use-cases for effects

---

## Lesson 6: Client Side Routing (React Router)

- `<Route path="/">` is like a if-statement to see if the URL matches the `path`
- By Default `<Route>` paths will match anything that starts with the path string unless we use the `exact` prop
- Wrap multiple Route components in a `<Switch>` to change the behavior from "any route can match" to "only the first route in the switch can match" - so in other words, like switch statements in programming.
- Nested layouts can be achieved by means of each layout component having it's own Switch/Routes that build the next sub-level of UI.
- By doing `<Route path="/users/:userId" />`, we can access the `userId` on the component rendered from this route via `useParams`
- There are other hooks from React Router like `useRouteMatch`, `useHistory`, and `useLocation`
- The `<Link to>` component makes an `<a href="" />` but navigates without reloading the page (Single Page Application)
- We can programmatically navigate also:

```js
const history = useHistory()
history.push('/path')
```

---

## Lesson 7: Context

- Parent components send variables (data) down to their child components via props.
- Data flows Down ("Uni-directional Data Flow"): React's data model is said to be "uni-directional", meaning data flows from parent components down through the tree to child components. However, if a prop is passed down from parent to child and the prop is a callback function, then we might say that child components can communicate back up to their parents by calling the function. Some would say that "data flows down, and events flow up" the tree.
- This makes passing data back and forth through parent/child hierarchies pretty easy. However, when components need to communicate with other components far away in this tree structure, the conventional solution has been to "lift state". In other words, if two components need to communicate we need to put state in one of their common ancestor (parent) components. Then one of the child components can communicate to the parent (through callback function props), which might lead to a state change and then the parent component can propagate that change down the tree to the other child component(s).
- Context is a way to pass data around our app without having to do prop drilling.
- Context gives us a `<Provider />` component which broadcasts data to all the sub-nodes and then a hook called `useContext` is used to consume that data. There could be many nodes between the provider and the consumer components and none of these will be aware or involved with passing data down (as would happen with prop drilling).
- A good mental model is that the provider passes data over many of its children down to a lower level child component. Then the child component consuming the context could communicate back up to the provider via callbacks.

- Docs on "Lifting State": https://reactjs.org/docs/lifting-state-up.html
- `useContext` docs: https://reactjs.org/docs/hooks-reference.html#usecontext

---

## Lesson 8: Authentication

- This lesson reviews how we can use context with reducers to create "global state" for the purposes of authentication

---

## Lesson 9: App State

- This lesson is mostly review with some strategies to think about for solving problems with application state
