# Cheat Sheet

## Function Components

In React, any function can be a component:

```js
function Comp() {
  return <div />
}
const Comp = () => {
  return <div />
}
const Comp = () => <div /> // Arrow function with "implicit return"
```

You can take any of those above and "type" them, but there would be lots of nuances to consider. So We have this one for you:

```tsx
// Instead of this in JS
const Comp = ({ name }) => {
  return <div />
}

// Do this in TS
type Props = { name: string }
const Comp: React.FC<Props> = ({ name }) => {
  return <div />
}

// The `type Props` is optional if you don't have any props beyond `children`
// That also means the `<Props>` generic would go away
```

## State with useState

https://github.com/typescript-cheatsheets/react#usestate

```tsx
// In JS or TS you can do this
const [name, setName] = useState('Jane')

// In TS though, `name` is "inferred" to be a string. If you don't know what
// the starting value is ahead of time, or if it can have multiple types, you
// need to use the generics
const [name, setName] = useState<string | null>(null)
// Now `name` can be a string or null
```

## Refs

https://github.com/typescript-cheatsheets/react#useref

```tsx
// This is normal in React with no argument. Technically, if you pass an
// argument, you're establishing the starting point for .current
const divRef = useRef() // divRef.current is undefined
const divRef = useRef('a') // divRef.current is 'a'

// Refs are tricky with TypeScript because we need refs for their .current
// but we don't know what that will be yet:
const divRef = React.useRef<HTMLDivElement>(null)
// So we use generics like this to signal what the ref "can" and will be soon.
// We have to be specific with the element type (div in our case) because
// when we try to do `divRef.current.someProperty`, TypeScript will want to
// ensure that "someProperty" is possible on divs.
```

In TypeScript, there is the "Non Null assertion" operator. From the docs:

> "A new ! post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts where the type checker is unable to conclude that fact."

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator

It should be used sparingly. But you might see it like this:

```tsx
// Without it
const divRef = React.useRef<HTMLDivElement>(null)
// Later (like in a useEffect) we might have to do "type narrowing"
// to ensure .current is available:
useEffect(() => {
  if (!divRef.current) return
  // Now we know that at this point, divRef.current is available
}, [])

// WITH IT!
const divRef = React.useRef<HTMLDivElement>(null!) // <-- THERE IT IS

useEffect(() => {
  // Even though divRef would ordinarily be either this HTMLDivElement
  // or null, we've told TypeScript that we know better than they do
  // and take null out of that equation. Thus we wouldn't need that
  // if-statement here to be able to use divRef.current
}, [])
```

# Forms

The main thing you'll probably need to consider for forms is the `event` object you're given for event functions:

```tsx
function onClick(event: React.MouseEvent): void {}
return <button onClick={onClick}>Click</button>

// Sometimes you'll need to narrow the event down to what type
// of element caused the event. In that case use generics
const onClick = (e: React.MouseEvent<HTMLButtonElement>): void => {}
```

Here are some common events

- React.MouseEvent
- React.ChangeEvent
- React.FormEvent
- React.KeyboardEvent

# useEffect and useLayoutEffect

There's not much you need to do with these that pertains specifically to their API:
https://github.com/typescript-cheatsheets/react#useeffect

# useReducer

https://github.com/typescript-cheatsheets/react#usereducer

```tsx
// Be sure to "type" the state and actions
type State = {
  /* ... */
}

// Depending on how you're using the reducer and dispatch, you need to consider
// the shape of the actions being passed in. Since a common approach is objects
// with a `type` property (`type` in this case has nothing to do with TS), you
// could type it like this
type Actions = { type: 'LOGIN'; userId: number } | { type: 'LOGOUT' }

const initialState: State = {}
const [state, dispatch] = useReducer((state: State, action: Actions) => {}, initialState)
```

# Custom Hooks

Custom hooks are just functions that use other hooks. So all the internals of your custom hook will follow normal TypeScript rules and the stuff above. However, it's common to return an array from custom hooks which can be tricky:

```tsx
function useToggle(value: boolean) {
  const [state, setState] = useState(value)
  function toggle() {
    setState(!value)
  }
  return [state, toggle]
}

export const MyComponent: React.FC = () => {
  const [value, toggle] = useToggle(false)

  // With the array returned from the hook, Typescript will infer that any value
  // in the array can be boolean or function. This can be problematic when you
  // want to do things with the state that can't be done on functions like this:
  value.substr(0, 3)

  // This would cause an error, again because TS thinks value "could be" a function
}

// Two Fixes:
// 1. Establish the return type to let TS know it's an array where the first item
// is a boolean and the second is a function
function useToggle(value: boolean): [boolean, () => void] {
  const [state, setState] = useState(value)
  function toggle() {
    setState(!value)
  }

  // 2. Or, do this "as const" for "const assertion" which tells TypeScript these
  // are constants and will not change, basically similar to what we did with #1
  // where we establish it's an array with a boolean and a function
  return [state, toggle] as const
}
```
