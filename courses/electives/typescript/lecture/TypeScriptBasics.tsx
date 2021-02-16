/****************************************
  Basic Types and Functions
*****************************************/

let admin: boolean = true
let message = 'hello world'
let age: number = 70
let someVariable: any = 'could be a string, or number, or object, etc...'

let person: object = { name: 'brad' }
// Since person is `let` and only has to be of type "object", it's a little
// too generic
person = { name: 'new name' }
console.log(person)

// Arrays
const arrayOfNumbers: number[] = [1, 2, 3]
const mixedArray: any[] = [1, 2, 'a', false]

// Function declaration
function logOne(message: string | number): void {}

// Arrow function
const logTwo = (message: string | number): void => {}

// don't use `undefined` as the return type unless you plan on explicitly returning that, use `void`

/****************************************
  Implicit, String literals, and Unions
*****************************************/

// // Implicit String
// let user = 'member'
// user = 'admin' // changing is okay because implicit types

// // But if we did this, we're saying user is limited to this string literal
// let user: 'member'
// user = 'admin'

// // String literals aren't too useful unless we do unions
// let user: 'member' | 'admin'
// user = 'admin'

/****************************************
  `type` Alias
*****************************************/

// // In the above example, `user` is not a "type", it's a variable with
// // limited possible values

// type User = 'member' | 'admin'
// let user: User = 'admin'

// // Lets say you wanted a "Loading" type that is either `null` or
// // a particular object, like a "user" object:

// type Loading = null | object // bad
// type Loading = null | { name: string } // better

// // almost good?
// type User = { name: string }
// type Loading = null | User

/****************************************
  Intersection (merge types)
*****************************************/

// type User = { name: string }
// type Person = User & { age: number }

// const myself: Person = { name: 'Brad', age: 68 } // ✅
// const myself: Person = { name: 'Brad', age: 68, other: 'stuff' } // 🚨

/****************************************
  Interfaces
*****************************************/

// function logPerson(person: { name: string }) {
//   console.log(person)
// }

// interface Person {
//   name: string
//   // age?: number
//   // readonly age: number // Variables use const whereas properties use readonly.
//   // sayHi?: () => string
//   // [key: string]: any
// }

// function logPerson(person: Person): void {
//   console.log(person)
// }

// logPerson({ name: 'brad' })

/****************************************
  Type Alias vs Interface
*****************************************/

// // Type Aliases vs Interface
// // https://www.youtube.com/watch?v=crjIq7LEAYw

// // Type aliases are small compared to interfaces:
// type Names = string[]

// // Here's an interface version of Names
// interface Names {
//   [index: number]: string
// }

// // Types are great for tuples (array of fixed known value types)
// type MyTuple = [number, boolean]

// // Function Type:
// type LogName = (name: string) => void
// const logName: LogName = name => {
//   console.log(name)
// }

// // Function Interface:
// interface LogName {
//   (name: string): void
// }
// const logName: LogName = name => {
//   console.log(name)
// }

/****************************************
  Type Assertions (const assertions)
*****************************************/

// From https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#const-assertions

// Essentially, do not "widen" by inferring `x` is a number, keep it constant

// // Type '10'
// let x = 10 as const

// // Type 'readonly [10, 20]'
// let y = [10, 20] as const

// // Type '{ readonly text: "hello" }'
// let z = { text: 'hello' } as const

// Outside of .tsx files, the angle bracket assertion syntax can also be used.

// // Type '10'
// let x = <const>10

// // Type 'readonly [10, 20]'
// let y = <const>[10, 20]

// // Type '{ readonly text: "hello" }'
// let z = <const>{ text: "hello" }

/****************************************
  Generics (Type Variables)
*****************************************/

// function makeArray(x: string): string[] {
//   return [x]
// }

// function makeArray(x: number): number[] {
//   return [x]
// }

// // Take in a given type and return an array of that type
// function makeArray<T>(x: T): T[] {
//   return [x]
// }

// // We can make an interface for our function that also uses generics

// interface ValueToArray<T> {
//   (arg: T): T[]
// }

// const makeArray: ValueToArray<{ name: string } | string> = arg => {
//   return [arg]
// }

// console.log(makeArray({ name: 'brad' })) // ✅
// console.log(makeArray('hello')) // ✅
