import {
  type FormEvent,
  useState,
  useTransition,
  useActionState,
  useOptimistic,
  useRef,
} from 'react'
import { useFormStatus } from 'react-dom'
import { addMessage, makeTempId, saveUser } from './helpers/mockServer'

type Message = {
  id: number | string
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

//   // // 1. Making this an async function makes little difference
//   // // 2. However, setting messages state with the fn approach
//   // //    fixes the fact that messages were being overridden
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

//   let pending = false

//   async function formAction(formData: FormData) {
//     messageRef.current.value = ''
//     messageRef.current.focus()
//     console.log('start')
//     addMessage(formData.get('messageText') as string)
//       .then((res) => res.json())
//       .then(({ message: newMessage }) => {
//         console.log('resolve', messages)
//         setMessages((messages) => messages.concat(newMessage))
//       })
//   }

//   return (
//     <>
//       <form action={formAction} className="max-w-96 space-y-3">
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
//   const [pending2, startTransition] = useTransition()

//   // async function formAction(formData: FormData) {
//   //   messageRef.current.value = ''
//   //   messageRef.current.focus()
//   //   startTransition(async () => {
//   //     const res = await addMessage(formData.get('messageText') as string)
//   //     const { message: newMessage } = await res.json()
//   //     setMessages((messages) => messages.concat(newMessage))
//   //   })
//   // }

//   async function formAction(formData: FormData) {
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
//       <form action={formAction} className="max-w-96 space-y-3">
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
//           <Pending>Pending...</Pending>
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

function Pending({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus() // useContext()
  return pending && children
}

/**
 * Example 4: useActionState for single-submission forms
 */

// 1. Make sure everyone knows how useReducer works and "reducing state"
// 2. Refactor this "hand-made" action to utilize useActionState
// 3. Remember the signature changes of the function (prev, asyncFn)
// 4. Eventually we can replace the two useState's and useTransition with useActionState

type ActionState = {
  success: boolean
  errors: string[]
}

export function App() {
  const [state, action, pending] = useActionState<ActionState>(
    async function (prevState: ActionState, formData: FormData) {
      const firstName = formData.get('firstName') as string | undefined
      const lastName = formData.get('lastName') as string | undefined

      const serverData = await saveUser(firstName, lastName).then((res) => res.json())
      if (serverData.success) {
        return {
          success: true,
          errors: [],
        }
      } else {
        return {
          success: false,
          errors: serverData.errors,
        }
      }
    },
    {
      success: false,
      errors: [],
    }
  )

  const { success, errors } = state

  // const [state, actionFn, isPending] = useActionState(async (prev, formData) => {}, initialState)

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
 * Example 5: When to NOT use useActionState: rapid-fire submissions submissions
 */

// START --------------------> Resolve
//                             START --------------------> Resolve
//                                                         START --------------------> Resolve

// Notes:
// 1. useActionState is designed to "reduce" state sequentially. This means if we
//    rapid-click the form we get less-than-ideal results:
// Issues:
// - Without startTransition, each action when it sets state waits for the previous
//   action to finish.
// - With startTransition, this fixes the sequential issue but we're not "reducing"
//   any state which means we're not really using useActionState as it was designed

// 2. Since we're "reducing" state now with useActionState, notice that adding the
//    async startTransition() to fix one issue above starts a new issue: that we can't
//    "reduce" and return anything for useActionState.
//
//    Ultimately, it seems like useActionState is designed for one-click submissions
//    and not rapid-fire multi-submit situations

// export function App() {
//   const messageRef = useRef<HTMLInputElement>(null!)
//   const [messages, setMessages] = useState<Message[]>([])
//   const [pending, startTransition] = useTransition()

//   async function action(formData: FormData) {
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
//       <form action={action} className="max-w-96 space-y-3">
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
 * Example 6: Optimistic Forms
 */

// export function App() {
//   const messageRef = useRef<HTMLInputElement>(null!)
//   const [messages, setMessages] = useState<Message[]>([])
//   const [pending, startTransition] = useTransition()

//   const [optimisticMessages, addOptimisticMessage] = useOptimistic(
//     messages,
//     (currentMessages, messages: Message[]) => {
//       return messages
//     }
//   )

//   async function action(formData: FormData) {
//     messageRef.current.value = ''
//     messageRef.current.focus()
//     const messageText = formData.get('messageText') as string

//     addOptimisticMessage(optimisticMessages.concat({ id: makeTempId(20), messageText }))

//     startTransition(async () => {
//       const res = await addMessage(messageText)
//       const { message: newMessage } = await res.json()
//       setMessages((messages) => messages.concat(newMessage))
//     })
//   }

//   return (
//     <>
//       <form action={action} className="max-w-96 space-y-3">
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
//       {optimisticMessages.map((message) => (
//         <div key={message.id} className="border-b">
//           {message.messageText}
//         </div>
//       ))}
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
