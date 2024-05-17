import { FormEvent, useState, startTransition, useTransition, useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { serverAddItem } from './helpers/serverAddItem'

/**
 * Example 1
 */

// Click the Add button three times quickly. With all these async events
// trying to manage one pending state, we get a scenario where the first
// one that comes back sets pending to false, yet there are still some pending.

// Also, we are "closing over" and empty items array three times and when
// each response resolves, they all try to set their state on that empty array

// START --------------------> END
//    START --------------------> END
//       START --------------------> END

// export function App() {
//   const [items, setItems] = useState<string[]>([])
//   const [pending, setPending] = useState(false)

//   // async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//   //   e.preventDefault()
//   //   setPending(true)
//   //   const { item } = await serverAddItem().then((res) => res.json())
//   //   setItems(items.concat(`Item ${item}`))
//   //   setPending(false)
//   // }

//   function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     setPending(true)
//     serverAddItem()
//       .then((res) => res.json())
//       .then((item) => {
//         setItems(items.concat(`Item ${item}`))
//         setPending(false)
//       })
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <button className="button">Add Item</button>
//       </form>
//       {items.map((i) => (
//         <div key={i} className="border-b">
//           {i}
//         </div>
//       ))}
//       {pending && <div>Pending...</div>}
//     </>
//   )
// }

/**
 * Example 2: startTransition
 */

// START --------------------> END
//    START --------------------> END
//       START --------------------> END

// export function App() {
//   const [items, setItems] = useState<string[]>([])

//   const [pending, startTransition] = useTransition()

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     startTransition(async () => {
//       const { item } = await serverAddItem().then((res) => res.json())
//       setItems((items) => items.concat(`Item ${item}`))
//     })
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <button className="button">Add Item</button>
//       </form>
//       {items.map((i) => (
//         <div key={i} className="border-b">
//           {i}
//         </div>
//       ))}
//       {pending && <div>Pending...</div>}
//     </>
//   )
// }

/**
 * Example 3: actions
 */

// 1. Use `action` instead of `onSubmit`
// 2. Remove `event` and `event.preventDefault` because actions do not
//    submit the form like `onSubmit` does

// By convention, functions that use async transitions are called “Actions”.
// https://react.dev/blog/2024/04/25/react-19#by-convention-functions-that-use-async-transitions-are-called-actions

// export function App() {
//   const [items, setItems] = useState<string[]>([])

//   const [pending, startTransition] = useTransition()

//   async function addItemAction() {
//     console.log('submit')
//     startTransition(async () => {
//       const response = await serverAddItem()
//       const { items: itemCount } = await response.json()
//       setItems((items) => items.concat(`Item ${itemCount}`))
//     })
//   }

//   return (
//     <>
//       <form action={addItemAction}>
//         <button className="button">Add Item</button>
//       </form>
//       {items.map((i) => (
//         <div key={i} className="border-b">
//           {i}
//         </div>
//       ))}
//       {pending && <div>Pending...</div>}
//     </>
//   )
// }

/**
 * Example 4: useActionState
 */

// Issues:
// 1. Without startTransition, each submit happens sequentially (look at console.log('submit'))
// 2. With startTransition, this fixes issue 1 but the pending status from useActionState
//    doesn't show up
// 3. We have to use the startTransition from useTransition to get the pending status
// of the useActionState to work all while ignoring the useTransition pending status

export function App() {
  const [items, setItems] = useState<string[]>([])

  // const [_, startTransition] = useTransition()

  const [state, action, pending] = useActionState(async function () {
    console.log('submit')
    startTransition(async () => {
      const response = await serverAddItem()
      const { items: itemCount } = await response.json()
      setItems((items) => items.concat(`Item ${itemCount}`))
    })
  }, null)

  return (
    <>
      <form action={action}>
        <button className="button">Add Item</button>
      </form>
      {items.map((i) => (
        <div key={i} className="border-b">
          {i}
        </div>
      ))}
      {pending && <div>Pending</div>}
    </>
  )
}

/**
 * Pending
 */

function Pending({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  return pending && children
}
