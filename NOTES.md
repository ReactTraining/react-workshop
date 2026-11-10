Like RSC: Less hydration, less JS shipped to the client

Dont like: adjacent tech that comes with it (forms and mutations)

# Forms

Single Button Forms (as a pattern)

- Async mutation

## Types of forms

- Classic (login, signup, inputs, big submit) <--- useActionState
- Rapid fire forms (overlapping submissions)

# Nuances for rapid fire forms

- Both actions and classic onSubmit work
  - onSubmit would require transition to track overlapping pending
  - whereas actions get implicit pending with useFormStatus()
  - both \*could use transitions
  - DONT use useActionState
