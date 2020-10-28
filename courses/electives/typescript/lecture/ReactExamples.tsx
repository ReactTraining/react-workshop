/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useRef,
  useState,
  useReducer,
  useEffect,
  PropsWithChildren,
  ReactElement
} from 'react'
import ReactDOM from 'react-dom'

/****************************************
  React FC Interface
*****************************************/

// /**
//  * From React
//  */

// // https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/
// interface FC<P = {}> {
//   (props: PropsWithChildren<P>): ReactElement | null
// }

// // /**
// //  * Our Code
// //  */

// interface Props {
//   message: string
// }

// export const MyComponent: FC<Props> = ({ message }) => {
//   return <div>{message}</div>
// }

/****************************************
  useState: Numeric Value
*****************************************/

// export const MyComponent: React.FC = () => {
//   // Explicit
//   // const [count, setCount] = useState<number>(0)

//   // Implicit number type
//   const [count, setCount] = useState(0)

//   // remember you can always do unions like <string | null>

//   return (
//     <button onClick={() => setCount(count + 1)} className="button">
//       Count: {count}
//     </button>
//   )
// }

/****************************************
  useState: Object
*****************************************/

// interface User {
//   name?: string
// }

// export const MyComponent: React.FC = () => {
//   const [user, setUser] = useState<User>({})

//   return (
//     <button onClick={() => setUser({ name: 'Nathan' })} className="button">
//       User: {user.name || <i>None</i>}
//     </button>
//   )
// }

/****************************************
  Props and onClick events
*****************************************/

// export const MyComponent: React.FC = () => {
//   const [showMessage, setShowMessage] = useState<boolean>(false)
//   return (
//     <Message
//       message="Yay, TypeScript 🎉"
//       showMessage={showMessage}
//       onClick={() => setShowMessage(true)}
//     />
//   )
// }

// interface Props {
//   message: string
//   showMessage: boolean
//   onClick: () => void
//   // You can hover (sometimes) or CTRL+Space on `onClick` event to see this definition
//   // onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
// }

// export const Message: React.FC<Props> = ({ message, showMessage, onClick }) => {
//   return (
//     <button onClick={onClick} className="button">
//       {!showMessage ? 'Click to see message' : message}
//     </button>
//   )
// }

/****************************************
  useRef: DOM
*****************************************/

// export const MyComponent: React.FC = () => {
//   // HTMLDivElement will ensure .current is just that, or null.
//   // The ! and the end of null makes it read-only which is ideal
//   // for refs that are used on DOM elements
//   const divRef = useRef<HTMLDivElement>(null!)
//   return <div ref={divRef} />
// }

/****************************************
  useRef: Mutable Ref
*****************************************/

// export const MyComponent: React.FC = () => {
//   // Mutable ref
//   const firstRender = useRef<boolean>(true)

//   useEffect(() => {
//     firstRender.current = false
//   }, [])

//   return <div />
// }

/****************************************
  useReducer
*****************************************/

// type Actions = {
//   type: 'INCREMENT' | 'DECREMENT'
//   [key: string]: any
// }
// // type Actions = { type: 'INCREMENT' } | { type: 'DECREMENT' }

// interface State {
//   count: number
// }

// export const MyComponent: React.FC = () => {
//   const [state, dispatch] = useReducer(
//     (state: State, action: Actions) => {
//       switch (action.type) {
//         case 'INCREMENT':
//           return { count: state.count + 1 }
//         case 'DECREMENT':
//           return { count: state.count - 1 }
//         default:
//           return state
//       }
//     },
//     {
//       count: 0
//     }
//   )

//   return (
//     <div className="spacing">
//       <div className="horizontal-spacing">
//         <button onClick={() => dispatch({ type: 'DECREMENT', other: 'stuff' })} className="button">
//           Decrement
//         </button>
//         <button onClick={() => dispatch({ type: 'INCREMENT' })} className="button">
//           Increment
//         </button>
//       </div>
//       <div>Count: {state.count}</div>
//     </div>
//   )
// }

/****************************************
  Custom Hook
*****************************************/

// function useStateAlt<T>(defaultState: T) {
//   const [state, setState] = useState(defaultState)
//   return [state, setState] as const // explained below
// }

// export const MyComponent: React.FC = () => {
//   const [count, setCount] = useStateAlt<number>(0)

//   return (
//     <button onClick={() => setCount(count + 1)} className="button">
//       Count: {count}
//     </button>
//   )
// }

// //// or

// function useToggle(value: boolean) {
//   const [state, setState] = useState(value)
//   function toggle() {
//     setState(!value)
//   }

//   // 1. Typescript simply infers that the values of this array can be
//   // booleans or functions
//   return [state, toggle]
// }

// export const MyComponent: React.FC = () => {
//   const [value, toggle] = useToggle(false)

//   // 1. Therefore, typescript is like "hold up, the things in that array can be booleans"
//   //    so we don't know if this is one, so you can't call it
//   return (
//     <button onClick={() => toggle()} className="button">
//       {value === false ? 'false' : 'true'}
//     </button>
//   )
// }

// // Fixes:
// // 1. Return: [boolean, () => void] to explicitly type a tuple
// // 2. Do: `return [state, toggle] as const` // const assertion

// // In this case, const assertion tells TypeScript these are constants and will not change
