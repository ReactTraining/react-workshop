# Widening

https://blog.logrocket.com/complete-guide-const-assertions-typescript/

Declaring primitives with `let` vs `const` determines how "narrow" the type definition will be. With `let` the definition is "widened" to the type of the value:

```ts
let x = 'abc' // x: string (widened)
const x = 'abc' // x: abc
```

With objects and arrays, the values are widened.

```ts
let thing = ['a', 123] // thing: (string | number)[]
thing = ['a', 'b'] // allowed
thing = ['a', true] // not allowed: boolean is not string | number
```

## as const

Asserting with `as const` makes the values read-only and not widened

```ts
let thing = ['a', 123] as const // thing: readonly ["a", 123]
```

This is why custom hooks need `as const` in React:

```tsx
function useCustomHook() {
  const [state, setState] = useState(true)
  // state: boolean
  // setState: Dispatch<SetStateAction<boolean>>
  return [state, setState]
}

const arr = useCustomHook()
// arr: (boolean | Dispatch<SetStateAction<boolean>>)[] ❌

const [x, setX] = useCustomHook()
// x: boolean | Dispatch<SetStateAction<boolean>> ❌
```

As we can see above, the types were widened

```ts
function useCustomHook() {
  const [state, setState] = useState(true)
  return [state, setState] as const
}

const arr = useCustomHook()
// arr: readonly [boolean, Dispatch<SetStateAction<boolean>>] ✅
```

# Narrowing

```ts
function fn(x: string | null) {
  // x: string | null
  if (typeof x === 'string') {
    // x: string
  }
  return x
}
```

## Non-null assertion operator

```ts
const x = fn('a')! // x: string
const x = fn(null)! // x: string (which is not correct)

// It's an "assertion" operator which is like saying we want TS
// to take our word and not figure it out on their own.
```
