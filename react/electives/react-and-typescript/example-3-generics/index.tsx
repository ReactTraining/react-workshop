// function makeArray<T>(a: T, b: T) {
//   return [a, b]
// }

// const array1 = makeArray('hello', 'generics')
// const array2 = makeArray(1, 2)

/****************************************
  Data Fetching
*****************************************/

// // Abstractions for HTTP fetch requests
// function get<T>(path: string): Promise<T> {
//   return fetch(`http://localhost:3333${path}`).then((response) => response.json())
// }

// // Abstractions for
// function getVacation(id: number) {
//   return get<Vacation>(`/vacations/${id}`)
// }

// type Vacation = {
//   id: number
//   name: string
//   price: number
//   related: number[]
// }

// getVacation(1).then((results) => {
//   console.log(results)
// })

/****************************************
  useState Generic Example
*****************************************/

// function useState<T>(defaultState: T) {
//   function setState() {}
//   return [defaultState, setState] as const
// }

// const [x] = useState(123)

/****************************************
  Promise: Generic Sleep Function
*****************************************/

// // Usage: somePromise().then(sleep(2000))
function sleep(ms = 1000) {
  return <T,>(value: T): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(value), ms)
    })
  }
}

/****************************************
  Promise Utilities
*****************************************/

// function someFunction() {
//   return Promise.resolve(123)
// }

// type value = Awaited<ReturnType<typeof someFunction>>
