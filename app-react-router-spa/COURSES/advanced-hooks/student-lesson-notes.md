# Student Learning Notes

You're encouraged to take notes, but we don't want that to get in the way of listening to the lectures. So, we made notes for you. Feel free to edit as you wish!

## Hooks Covered

- useEffect
- useMemo
- useCallback
- useRef
- useLayoutEffect
- useSyncExternalStore
- useOptimistic
- useTransition
- useActionState
- useFormStatus

---

## Lesson: useEffect

- useEffect is for running "side effects" after the render phase
- The dependency array is used like an if-statement between renders to compare old variables to new ones.
- The comparison is an equality check `===` which means that "unstable" variables like objects, arrays, and functions need to be made stable with memoization.
- "stable" means a variable that doesn't change it's identity unless we want it to.
- Memoization can be used to stabilize variables, either with useMemo, useCallback, or auto-memoization with the React 19 compiler babel plugin
- useMemo is a hook to memoize (or stabilize) a value while rendering. In other words "remember" a value so it does't have to be re-computed again on every render. Only compute it again if the useMemo dependency array changes
- useCallback is similar to useMemo but is used to "memoize" (or stabilize) a function's identity
- A return function from useEffect is a "cleanup" function that gets called when the component unmounts, or when the dependency array changes and we need to run another side effect (so we "cleanup" the previous side effect)
- The lecture demo's how to use the cleanup to fix network race conditions (shown below) or unsubscribing from subscriptions to prevent memory leaks
- React no longer complains about "setting state on an unmounted component". They used to say this _might_ create memory leaks, but usually they don't because usually we're not doing subscriptions.
- Refs can be used in ways that don't access the DOM, but instead are mutable objects (mutable refs). The lecture demos how to overcome "stale state" by storing a value in a ref.

```js
useEffect(fn) // runs when a component mounts, and on any re-render
useEffect(fn, []) // runs just when a component mounts
useEffect(fn, [some, example, state]) // runs when a component mounts, and when `some` or `example` or `state` changes.

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

// useMemo calls the fn in the render phase (synchronously) and "memoizes"
// the return value as x in this example based on the input of the dep array.
// This is mostly used for:
// 1. performance - memoizing the return value a function
// 2. stabilizing objects and arrays that will end up in other dependency arrays
// 3. stabilizing objects and arrays that will be passed as props to memoized components (see below)
const x = useMemo(fn, [])

// useCallback never calls the fn passed in. Instead it "memoizes" the function itself
// by stabilizing it and returning it. This is mostly used for:
// 1. stabilizing functions that will end up in other dependency arrays
// 2. stabilizing functions that will be passed as props to memoized components (see below)
const fn = useCallback(fn, [])
```

- Docs for useRef: https://react.dev/reference/react/useRef
- Docs for useEffect: https://react.dev/reference/react/useEffect
- Docs for useMemo: https://react.dev/reference/react/useMemo
- Docs for useCallback: https://react.dev/reference/react/useCallback
- Docs for effects: https://react.dev/learn/synchronizing-with-effects
- Docs for effects: https://react.dev/learn/you-might-not-need-an-effect
- https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/
- https://reacttraining.com/blog/when-to-use-functions-in-hooks-dependency-array/
- https://reacttraining.com/blog/setting-state-on-unmounted-component
- https://reacttraining.com/blog/useEffect-cleanup
- https://reacttraining.com/blog/hooks-you-probably-dont-need

---

## Lesson: Synchronization

Synchronize the events from within my component to the outside world:

- useEffect and useLayoutEffect

Synchronize the outside world's events to my component:

- useSyncExternalStore

The React team has alluded to the word "sync" in useSyncExternalStore as meaning both:

- Synchronize: As in synchronize the outside world's events to my component, and
- Synchronous: As in it can be used only with synchronous events (not async things)

---

## Lesson: Imperative React

In contrast to React's normal "declarative" approach of "describing the next UI" through re-renders, and in doing so, being somewhat hand's off with the DOM, React also offers some imperative APIs.

- useRef can be described as "an escape hatch to get around the declarative nature of React, and into more of a hands-on imperative approach".
- Refs can be added to the DOM via an initiation function instead of directly adding the ref via prop:

```jsx
<div
  ref={(node) => {
    // gets called when the div is ready in the DOM
  }}
></div>
```

- Portals are a way to send a component's rendering instructions (UI) to another part of the DOM other than the place that the parent component rendered it.
- Event bubbling is the JavaScript concept of events that will start at their target and will trigger the event on all the parents and parents of parents of DOM nodes going all they way from the target element to the root HTML element.
- React components can "imperatively" add events onto DOM nodes like the top window object using useEffect and creating a subscription. See final example in lecture.
- There is a new CSS "popover" API which will replace common JS strategies soon. It allows us to link two DOM nodes in a way that creates an anchor element and a popover element to create popovers such as tooltips, dropdown menus, or modals.

---

## Lesson: Transitions

The docs describe transitions as being a way to "let you update the state without blocking the UI". Ordinarily, setting state is a high priority operation:

- Setting state and creating rapid re-renders is something that normally queues and each render happens in succession to the previous. In other words, they are not interruptible.
- This can create slow experiences when we have frequent but also so re-renders
- There's certain cases when we might want to "opt-into" React's new "concurrent mode" which means we can set state in a way that is "low priority" and it's re-render is interruptible for other renders that might be more important or more up-to-date:

```js
const [pending, startTransition] = useTransition()

function someEvent() {
  // normal state setting is high priority
  setStateOne()

  startTransition(() => {
    // Since we're setting this state in a startTransition,
    // it's putting react into concurrent mode, it's re-render
    // will be separate and parallel to the previous set state,
    // and it's separate render is considered low priority and
    // is interruptible
    setStateTwo()
  })
}
```

---

## Lesson: Optimistic UI

"Optimistic UI" is when we give the user the illusion that their event is immediate. It's the idea that their event will have some latency (usually network latency) and instead of waiting for a response to show a successful UI, we anticipate the network will return and we show the successful UI early.

In some cases, we can use state and some tricks to manage our optimistic UI (and state) ourselves. The new hook useOptimistic makes this process easier for form actions:

```jsx
// Notice this isn't an onSubmit
<form action={formAction}></form>
```

While a form action is pending, we can update our optimistic state early (before the form resolves the data) to show the user an early successful UI:

https://react.dev/reference/react/useOptimistic#optimistically-updating-with-forms

---

## Lesson: Form Actions

A lesser known feature of form submissions is the ability to use the event to retrieve the form's data:

```jsx
function onSubmit(event) {
  const formData = new FormData(event.currentTarget)
  formData.get('age')
}

return (
  <form onSubmit={onSubmit}>
    <input type="text" name="age" />
  </form>
)
```

One of React's newer features is the ability to overload the form action. In other words, we can do `<form action="/string" />` if we want to use forms the traditional "HTML Way" where the action is a path on the server, or we can pass a function:

```jsx
function formAction(formData) {
  formData.get('age')
}

return (
  <form action={formAction}>
    <input type="text" name="age" />
  </form>
)
```

This new feature unlocks some of React's other new features, like `useOptimistic` for example. We can also use async transitions inside the action:

```jsx
const [pending, startTransition] = useTransition()

async function formAction(formData) {
  startTransition(async () => {
    await sendToServer(formData.get('message))
  })
}

return (
  <form action={formAction}>
    <input type="text" name="message" />
  </form>
)
```

By doing so, the startTransition gives us an easy way to have a "pending status" for the form's submission(s)

For common forms that are not "rapid-fire" multi-submit forms, we can use useActionState to manage an asynchronous action with a built-in async transition to "reduce" the form's state all while managing the pending status and all in one hook. See Example 4 in the lecture
