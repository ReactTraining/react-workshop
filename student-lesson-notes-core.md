# Student Learning Notes

The workshop has lectures followed by exercises. The exercises are your chance to write code, so we hope you're able to sit back and enjoy the lectures without feeling like you have to code-along at our fast pace. You're encouraged to take notes, but we don't want that to get in the way of listening to the lecture. So, we made notes for you! This is your repo so feel free to make edits.

---

## Lesson 1: Rendering

- We like React because it's Composable and Declarative
  - Composable: You can build small re-usable parts which can be used to build bigger, more complex things
  - Declarative: We write in a style where we say "what" we want. In other words `<StarRatings>` is declarative because we said we want star ratings on the page, but we didn't have to program "how" they work. Whoever did program the internals of `<StarRatings>` programmed "how" they work. All declarative code that we write has imperative code somewhere else that someone else wrote.
- JSX is a syntax for easily creating nested elements. Babel is a Webpack plugin that converts each JSX "tag" into `React.createElement`
- The return value of a component (JSX turned into `React.createElement`) is like an "instruction manual" for how to create DOM elements.
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
  - This re-render will mean new JSX is returned that reflects the new state. It's like a new instruction manual for what do change in the DOM.
  - React takes the previously returned JSX and the new JSX and finds the differences (called a diff). Only the things that are different are used to change the real DOM. This makes React very fast.

Docs: https://reactjs.org/docs/hooks-state.html

---

## Lesson 3: Controlled Components

- Form fields in React are either "controlled" or "uncontrolled".
- By default, fields are "uncontrolled". This means that React is not controlling the value of the field. The user types into the field and whatever they type is the value (just like any HTML form made in the last 25 years). It's "uncontrolled" because React is not controlling the value.
- By contrast, if we do a `onChange` event for the field and take what the user types and turn that into state, then we take the state and put that back into the field's value prop, then you can say React is controlling the value. Now it's a "controlled" field. Even though it might seem as though the user is still controlling the value, React _could_ adjust, format, or change the value if we program it to do so. So it's really React that's controlling the value the user sees.
- Pros and Cons:

  - Uncontrolled fields are easier to set up because you just type `<input />` and you're done. Whereas with controlled you have to setup the `onChange` and `value` props for the field so that state orchestrates the value of the field.
  - Uncontrolled fields give you less abilities. If you need something else to set the value of the field, then we can't use uncontrolled. Also, if we want to read the value of an uncontrolled field (for form submissions), then we have to figure out a way to read the DOM (probably with refs) whereas controlled fields already have their stateful values ready for us.

- Docs: https://reactjs.org/docs/uncontrolled-components.html

---

## Lesson 4: Effects

- `useEffect` Format: `useEffect(callbackFunction, [dependencyArray])`
- `useEffect` is used for side effects. Typically this means we want to do something outside of our component, like a network request or perhaps with cookies/localstorage, and we want to do that side effect any time state changes.
- The effect callback runs when the component first mounts and then anytime the values in the dependency array change. Having an empty dependency array is a way to ensure the effect only runs once.
- However, be careful, any variables that your effect uses (depends on) need to be stated in your dependency array. With the older mental model of time and `componentDidMount`, we thought in terms of "this just needs to happen once when we mount". But now with `useEffect` we need to think in terms of "anytime state changes, what do I need to do". Therefore you'll probably need to put values in your dependency array often.

```js
useEffect(fn) // runs when a component mounts, and any state changes
useEffect(fn, []) // runs just when a component mounts
useEffect(fn, [some, example, state]) // runs when a component mounts, and when `some` or `example` or `state` changes.
```

- For folks who have some React experience, it's easy to compare `useEffect` to things like `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`. However, this older mental model where "time" is considered will not be a good mental model for hooks and `useEffect`. Instead we think in terms of state and changes to that state and how that needs to synchronize to DOM and what effects may need to be ran again when state changes.
- Avoid infinite loops: If an effect has no dependency array and also sets state, this will cause an infinite loop. Imagine that the component mounts which calls the effect. Then state is changed which leads to a re-render which means the effect will be called again because there was no dependency array telling react not to run the effect again. Then since the effect runs again and sets state, this creates an infinite loop.
- In the callback for the effect, you can either return no value or return a function. If a function is returned, it's said to be the "cleanup function". This function is called when the component unmounts or when the dependency array changes.
- When setting state asynchronously in an effect, there's always a chance the component will become unmounted or the dependency array might change before the set state is called. For both cases, we need to use a cleanup function to ensure we're not setting state on the unmounted component or setting state that was based on the previous values of the dependency array. This is how we might prevent this problem with an `isCurrent` variable:

```js
useEffect(() => {
  // 1. The effect first runs so we'll say it's "current"
  let isCurrent = true
  // 2. Go out and get a user on the network
  fetchUser(uid).then(user => {
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

- Docs: "Using the Effect Hook": https://reactjs.org/docs/hooks-effect.html
- A very long but complete guide to useEffect: https://overreacted.io/a-complete-guide-to-useeffect/

---

## Lesson 5: Routing

// TODO

---

## Lesson 6: Reducers

- `useReducer` Format: `const [state, dispatch] = useReducer(reducerFunction, initialState)`.
- `useReducer` is the reducer pattern for local state. It's an alternative to using `useState`. `useReducer` can be good for complex local state.

- `useReducer` docs: https://reactjs.org/docs/hooks-reference.html#usereducer

---

## Lesson 7: Data Flow

- Parent components send variables (data) down to their child components via props. Remember, even though props look like "attributes" of HTML, we call them props because they are going to turn into properties of the second argument to `React.createElement(MyButton, { hereAreTheProps: true })`
- A component can be a "child component" in respect to its parent, but could also be a parent component because it further has child components.
- This relationship between components builds a tree structure that will probably resemble the DOM tree structure that React is building for you.
- Data flows down: React's data model is said to be "uni-directional", meaning data flows from parent components down through the tree to child components. However, if a prop is passed down from parent to child and the prop is a callback function, then we might say that child components can communicate back up to their parents by calling the function.
- This makes passing data back and forth through parent/child hierarchies pretty easy. However, when components need to communicate with other components far away in this tree structure, the conventional solution has been to "lift state". In other words, if two components need to communicate we need to put state in one of their common ancestor (parent) components. Then one of the child components can communicate to the parent (through callback function props), which might lead to a state change and then the parent component can propagate that change down the tree to the other child component(s).
- Context is a way to pass data around our app without having to do prop drilling.
- Context gives us a `<Provider />` component which broadcasts data to all the sub-nodes and then a hook called `useContext` is used to consume that data. There could be many nodes between the provider and the consumer components and none of these will be aware or involved with passing data down (as would happen with prop drilling).
- A good mental model is that the provider passes data over many of its children down to a lower level child component. Then the child component consuming the context could communicate back up to the provider via callbacks.

- Docs on "Lifting State": https://reactjs.org/docs/lifting-state-up.html
- `useContext` docs: https://reactjs.org/docs/hooks-reference.html#usecontext

---

## Lesson 8: App State

- Imagine Reducers and Context had a beautiful baby. That baby would look an awful lot like Redux, except in pure React!
- A good method of organization is setting up a reducer and context object at the top level of the application, and import functions that use the top level context.
- It's important to not put every piece of state at the top level, to avoid unnecessary diffs and re-renders. Providers can be inside providers, and more than one reducer can be used in components. So, try to be discerning in separating state by sections of your application. A common thing you might want at a global level is authentication, but something like a selected item can be lower down in the application, but still set up within its own context and with reducers.

---

## Lesson 9: Hooks Composition

- When you want to make your own hook, that just means wrapping React hooks with your code together. Writing generic hooks that can encapsulate logic that you often re-write (for example, a `useEffect` with a basic cleanup function) is a great way to clean up your components.

- `useCallback` docs: https://reactjs.org/docs/hooks-reference.html#usecallback
