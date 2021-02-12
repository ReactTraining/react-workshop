# Are you a Java or C# dev trying to learn TypeScript?

If you're coming from Java or C# here is a great starting point for you to understand some differences - https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html

In general, it can be easier to think of TS as a "linter" more so than a programming language. Ultimately, your types will not end up in production code. TS will "compile" to JS which in this case mostly just means that the types are stripped out so the end result is valid JS

Also here are some high level points:

- TS can infer types and has Duck Typing - https://ajay-bhosale.medium.com/typescript-and-duck-typing-7b3d7bb6f03c

- TS can have unions `type Animal = 'dog' | 'cat'`. Now variables with the type of Animal are almost like enums that can only be one of those two values

- In TS, if a variable can be null, it needs to be defined.

```ts
const x = 10
// ERROR
// x's type is inferred to be exactly `10` because of `const`
x = 11

let y = 10
// VALID
// y's type is inferred to be `:number` because of `let`
y = 11
// ERROR
// But it was never allowed to be null
y = null
console.log(y)

// We would have to do this if we wanted y to be null
let y: number | null = 10
y = 11 // Valid
y = null // Valid
```

- TS has an `any` type

```ts
let x: any = 10
x = { age: 50 } // Valid
```
