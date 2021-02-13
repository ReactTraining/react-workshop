# Are you a Java or C# dev trying to learn TypeScript?

If you're coming from Java or C# here is a great starting point for you to understand some differences - https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html

In general, it can be easier to think of TS as a "linter" more so than a programming language. Ultimately, your types will not end up in production code. TS will "compile" to JS which in this case mostly just means that the types are stripped out so the end result is valid JS

Also here are some high level points:

- TS can infer types and has Duck Typing - https://ajay-bhosale.medium.com/typescript-and-duck-typing-7b3d7bb6f03c

```ts
type User = {
  id: number
  name: string
}

function getName(user: User): string {
  return user.name
}

// Name is inferred to be a string
const name = getName({ id: 1, name: 'Brad' })
```

- In TS, unions can be value-specific:

```ts
// Variables of Animal type can only be these specific strings
// Essentially this creates an enum:
type Animal = 'dog' | 'cat'
```

- In TS, if a variable can be `null` or `undefined`, it needs to be explicitly typed:

```ts
// variables of type User cannot be null or undefined
type User = {
  id: number
  name: string
}

function getName(user: User | null): string | null {
  return user && user.name
}

// Fails. undefined is not the same as null and the function only wants
// User | null
getName(undefined)

// Fails. The getName function could take null, but `myself` is a User type
// that cannot be null
const myself: User = null
getName(myself)
```

- TS has an `any` type

```ts
let x: any = 10
x = { age: 50 } // Valid
```
