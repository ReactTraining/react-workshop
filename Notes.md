# RSC (with NextJS)

- The RSC "vision" made by the react team
- The vision includes the CORE of RSC concepts plus a new data fetching and mutations strategy
- NextJS is 100% inline with that vision because the React team and Next team are a lot of the same people

## RSC Good

- Less hydration, smaller bundle size

## RSC Bad

- LOTS OF RULES
- New RSC way of doing mutations (HTTP: POST/DELETE/PUT)
  - useFormStatus(). <-- action
  - useActionState(). <-- action
  - useOptimistic(). <-- action

# React Router Framework

formerly Remix

- Mutations via Actions
- Data Fetching via Loaders
- RSC: Less hydration, smaller bundle size

// Mutations the "react RSC way"

- useFormStatus(). <-- action fn
- useActionState(). <-- action fn
- useOptimistic(). <-- action fn

```tsx
// Server Only
export async function loader() {
  return {
    thing: <Faq />,
  }
}

// Client Comp (server + client)
export default function Page() {
  const thing = useLoaderData()
  return (
    <div>
      {thing}
      <button onClick={}></button>
    </div>
  )
}
```
