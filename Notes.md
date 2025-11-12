# Forms

## Rapid fire forms

- onSubmit - good
- action
  - useOptimistic
  - useActionState - DOES NOT WORK - because each "reducer" needs to finish before the next can start

## Classic (fill out all the fields then submit) Forms

- onSubmit - good
- action
  - useOptimistic
  - useActionState - like a reducer for actions

# Nextjs

## app api - RSC

- Implicit when it comes to deciding static or not
- Every comp is a RSC by default
- We can "opt-into" Client Components using the `use client` directive

## pages api - older "classic"

- Explicit when it comes to deciding static or not
- Everything is ALWAYS a Client Component

## RSC

- I like RSC at face value - less hydration and smaller js bundle size

- RSC comes with all this adjacent technology, especially related to "mutations" - aka form submissions

  - I dont like this part, and I don't like all the RULES

## RSC Rules

- Server comp can "own" a client comp
- Server comp can own a server comp
- Client comp can own client comp
- Client comp CANNOT OWN server comp
- Use actions, which don't behave likes events when it comes to setting state
- doing `use client` in comp means we can't make action `use server` if its in the same file
- actions can say `use server` inside when the whole file is a server comp, but if the comp is
  a client comp, and the action is moved to own file, then `use server` goes to top
