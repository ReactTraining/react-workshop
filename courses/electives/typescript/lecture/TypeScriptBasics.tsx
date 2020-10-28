/* eslint-disable @typescript-eslint/no-unused-vars */

/****************************************
  Basic Types and Functions
*****************************************/

// const admin: boolean = true
// const message = 'hello world'
// const message: number = 'hello world'
// const someVariable: any = 'whatevers'

// // non-primitive type (number, string, boolean, null, undefined, etc)
// const person: object = { name: 'brad' }

// Arrays
// const numbers: number[] = [1, 2, 3]
// const numbers: any[] = [1, 2, 3]

// // Function declaration
// function log(message: string | number) : void {}

// // Arrow function
// const log = (message: string | number): void => {}

// // don't use `undefined` as the return type unless you plan on explicitly returning that, use `void`

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

// // type Loading = null | object // bad
// // type Loading = null | { name: string } // better

// // almost good?
// type User = { name: string }
// type Loading = null | user

/****************************************
  Intersection
*****************************************/

// type Person = { name: string } & { age: number }

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

// // Alias is better (smaller)
// type Names = string[];

// // No advantage for interface for basic example
// interface Names {
//   [index: number]: string;
// }

// // Great for tuples
// type Point = [number, number];

// // Functions

// type LogName = (name: string) => string
// const logName: LogName = name => name

// interface LogName {
//   (name: string): void
// }
// const logName: LogName = name => name
// console.log(logName)

/****************************************
  Type Assertions ()
*****************************************/

// // From https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/#const-assertions

// // Type '10'
// let x = 10 as const;

// // Type 'readonly [10, 20]'
// let y = [10, 20] as const;

// // Type '{ readonly text: "hello" }'
// let z = { text: "hello" } as const;

// Outside of .tsx files, the angle bracket assertion syntax can also be used.

// // Type '10'
// let x = <const,>10

// // Type 'readonly [10, 20]'
// let y = <const,>[10, 20]

// // Type '{ readonly text: "hello" }'
// let z = <const,>{ text: "hello" }

/****************************************
  Generics (Type Variables)
*****************************************/

// // We can do "identity" then this:
// function makeArray<T>(x: T): T[] {
//   return [x]
// }

// Then we can show how an interface can basically take "types"
// as a dynamic argument

// interface ValueToArray<T> {
//   (arg: T): T[]
// }

// const makeArray: ValueToArray<{ name: string }> = arg => {
//   return [arg]
// }

// console.log(makeArray({ name: 'brad' }))
