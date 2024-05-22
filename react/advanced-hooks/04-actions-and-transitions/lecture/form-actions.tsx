import {
  type FormEvent,
  useState,
  useTransition,
  useActionState,
  useOptimistic,
  useRef,
} from 'react'
import { useFormStatus } from 'react-dom'
import { addMessage, changeQuantity, saveUser } from './helpers/mockServer'

type Message = {
  id: number
  messageText: string
}

// Reference Material
// https://react.dev/reference/react-dom/components/form

/**
 * Example 1
 */

// Click the Add button three times quickly. With all these async events
// trying to manage one pending state, we get a scenario where the first
// one that comes back sets pending to false, yet there are still some pending.

// Also, we are "closing over" and empty items array three times and when
// each response resolves, they all try to set their state on that empty array
// We'll use the setState(fn) approach to avoid closure

// Note that the pending status goes to false on the first resolve and yet
// not of the other items have resolved yet

// START --------------------> Resolve (sets pending false)
//    START --------------------> Resolve
//       START --------------------> Resolve

// export function App() {
//   const messageRef = useRef<HTMLInputElement>(null!)
//   const [messages, setMessages] = useState<Message[]>([])
//   const [pending, setPending] = useState(false)

//   // async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//   //   e.preventDefault()
//   //   setPending(true)
//   //   const formData = new FormData(e.currentTarget)
//   //   messageRef.current.value = ''
//   //   messageRef.current.focus()
//   //   const res = await addMessage(formData.get('messageText') as string)
//   //   const { message: newMessage } = await res.json()
//   //   setMessages((messages) => messages.concat(newMessage))
//   //   setPending(false)
//   // }

//   function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setPending(true)
//     const formData = new FormData(e.currentTarget)
//     messageRef.current.value = ''
//     messageRef.current.focus()
//     console.log('start')
//     addMessage(formData.get('messageText') as string)
//       .then((res) => res.json())
//       .then(({ message: newMessage }) => {
//         console.log('resolve', messages)
//         setMessages(messages.concat(newMessage))
//         setPending(false)
//       })
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="max-w-96 space-y-3">
//         <input
//           type="text"
//           ref={messageRef}
//           className="form-field"
//           name="messageText"
//           placeholder="Message"
//           aria-label="Message"
//           autoComplete="off"
//           required
//         />
//         <div className="flex gap-3 items-center">
//           <button className="button" type="submit">
//             Submit
//           </button>
//           {pending && <div>Pending...</div>}
//         </div>
//       </form>
//       {messages.map((message) => (
//         <div key={message.id} className="border-b">
//           {message.messageText}
//         </div>
//       ))}
//     </>
//   )
// }

/**
 * Example 2: startTransition
 */

// Managing the pending status with a transition fixes the pending issue we
// were having before. Now the pending status stays pending until all async
// transitions are finished. This is because we're not managing "pending"
// ourselves but instead letting a tool that knows about our queue of async
// transitions is managing it.

// START --------------------> Resolve
//    START --------------------> Resolve
//       START --------------------> Resolve

// export function App() {
//   const messageRef = useRef<HTMLInputElement>(null!)
//   const [messages, setMessages] = useState<Message[]>([])
//   const [pending, startTransition] = useTransition()

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault()

//     const formData = new FormData(e.currentTarget)
//     messageRef.current.value = ''
//     messageRef.current.focus()
//     startTransition(async () => {
//       const res = await addMessage(formData.get('messageText') as string)
//       const { message: newMessage } = await res.json()
//       setMessages((messages) => messages.concat(newMessage))
//     })
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="max-w-96 space-y-3">
//         <input
//           type="text"
//           ref={messageRef}
//           className="form-field"
//           name="messageText"
//           placeholder="Message"
//           aria-label="Message"
//           autoComplete="off"
//           required
//         />
//         <div className="flex gap-3 items-center">
//           <button className="button" type="submit">
//             Submit
//           </button>
//           {pending && <div>Pending...</div>}
//         </div>
//       </form>
//       {messages.map((message) => (
//         <div key={message.id} className="border-b">
//           {message.messageText}
//         </div>
//       ))}
//     </>
//   )
// }

/**
 * Example 3: Form Actions
 */

// 1. Use `action` instead of `onSubmit`
// 2. Remove `event` and `event.preventDefault` because actions do not
//    submit the form like `onSubmit` does

// By convention, functions that use async transitions are called “Actions”.
// https://react.dev/blog/2024/04/25/react-19#by-convention-functions-that-use-async-transitions-are-called-actions

// export function App() {
//   const messageRef = useRef<HTMLInputElement>(null!)
//   const [messages, setMessages] = useState<Message[]>([])
//   const [pending, startTransition] = useTransition()

//   // async function formAction(formData: FormData) {
//   //   messageRef.current.value = ''
//   //   messageRef.current.focus()
//   //   startTransition(async () => {
//   //     const res = await addMessage(formData.get('messageText') as string)
//   //     const { message: newMessage } = await res.json()
//   //     setMessages((messages) => messages.concat(newMessage))
//   //   })
//   // }

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     const formData = new FormData(e.currentTarget)
//     messageRef.current.value = ''
//     messageRef.current.focus()
//     startTransition(async () => {
//       const res = await addMessage(formData.get('messageText') as string)
//       const { message: newMessage } = await res.json()
//       setMessages((messages) => messages.concat(newMessage))
//     })
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="max-w-96 space-y-3">
//         <input
//           type="text"
//           ref={messageRef}
//           className="form-field"
//           name="messageText"
//           placeholder="Message"
//           aria-label="Message"
//           autoComplete="off"
//           required
//         />
//         <div className="flex gap-3 items-center">
//           <button className="button" type="submit">
//             Submit
//           </button>
//           {pending && <div>Pending...</div>}
//         </div>
//       </form>
//       {messages.map((message) => (
//         <div key={message.id} className="border-b">
//           {message.messageText}
//         </div>
//       ))}
//     </>
//   )
// }

/**
 * Example 4: useActionState for one-click submissions
 */

// Refactor this "hand-made" action to utilize useActionState

function Pending({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return pending && children
}

export function App() {
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [pending, startTransition] = useTransition()

  async function action(formData: FormData) {
    const firstName = formData.get('firstName') as string | undefined
    const lastName = formData.get('lastName') as string | undefined

    startTransition(async () => {
      const serverData = await saveUser(firstName, lastName).then((res) => res.json())
      if (serverData.success) {
        setSuccess(true)
        setErrors([])
      } else {
        setSuccess(false)
        setErrors(serverData.errors)
      }
    })
  }

  // const [state, actionFn, isPending] = useActionState(async fn, initialState)

  return (
    <form action={action} className="max-w-96 space-y-3">
      {success && <p>Success!</p>}
      {errors.length > 0 && <p>{errors.join('. ')}</p>}
      <input
        type="text"
        className="form-field"
        name="firstName"
        placeholder="First Name"
        aria-label="First Name"
        autoComplete="off"
      />
      <input
        type="text"
        className="form-field"
        name="lastName"
        placeholder="Last Name"
        aria-label="Last Name"
        autoComplete="off"
      />
      <button className="button" type="submit" disabled={pending}>
        {pending ? 'Sending Data...' : 'Submit'}
      </button>
    </form>
  )
}

/**
 * Example 5: When to NOT use useActionState (rapid-fire multi-submit)
 */

// START --------------------> Resolve
//                             START --------------------> Resolve
//                                                         START --------------------> Resolve

// Notes:
// 1. useActionState is designed to "reduce" state sequentially. This means if we
//    rapid-click the form we get less-idea results:
// Issues:
// - Without startTransition, each action when it sets state waits for the previous
//   action to finish.
// - With startTransition, this fixes the sequential issue but we're not "reducing"
//   any state which means we're not really using useActionState as it was designed

// 2. Switch to reducing state instead of useState. Notice that we cannot really use
//    an async transition in conjunction with "returning state". Also, since we're not
//    explicitly setting state, setTransition has no value here
//
//    Ultimately, it seems like useActionState is designed for one-click submissions
//    and not rapid-fire multi-submit situations

// export function App() {
//   const [items, setItems] = useState<string[]>([])
//   const [pendingTransition, startTransition] = useTransition()

//   const [state, action, pendingActionState] = useActionState(async function () {
//     const response = await addItem()
//     const { items: itemCount } = await response.json()
//     setItems((items) => items.concat(`Item ${itemCount}`))
//   }, null)

//   return (
//     <>
//       <form action={action}>
//         <button className="button" type="submit">
//           Add Item
//         </button>
//       </form>
//       {items.map((i) => (
//         <div key={i} className="border-b">
//           {i}
//         </div>
//       ))}
//       {pendingActionState && <div>Pending Action State</div>}
//     </>
//   )
// }

/**
 * Example 6: Optimistic Forms
 */

// export function App() {
//   const [quantity, setQuantity] = useState(0)
//   const [error, setError] = useState('')

//   const [optimisticQuantity, setOptimisticQuantity] = useOptimistic(
//     quantity,
//     (currentQuantity, nextQuantity: number) => {
//       return nextQuantity
//     }
//   )

//   async function addQuantityAction() {
//     setOptimisticQuantity(optimisticQuantity + 1)
//     const response = await changeQuantity(optimisticQuantity + 1)
//     const { quantity: serverQuantity, error } = await response.json()
//     // error is returned if we add over 5

//     setQuantity(serverQuantity)
//   }

//   return (
//     <>
//       <form action={addQuantityAction}>
//         <button className="button" type="submit">
//           Add Item <Pending>...</Pending>
//         </button>
//       </form>
//       <div>Items In Cart: {optimisticQuantity}</div>
//     </>
//   )
// }

// Error Boundary with Classes
// https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary

// Brian's `react-error-boundary`
// https://github.com/bvaughn/react-error-boundary

// React docs on <form> and handling action errors with `react-error-boundary`
// Example not working atm:
// https://react.dev/reference/react-dom/components/form#handling-form-submission-errors
