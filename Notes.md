# There is a "vision" of React Server Components

- Less bundling 🤘
- Less Hydration 🤘

# But then, there's the implementation details

- Directives 👎 (who can own who, the rules)
- Mutations 👎 - useFormStatus, useActionState ????

# Forms

- Actions are nice
- transitions are nice
- useActionState is really only for "fire-once" forms
  - one issue with useActionState - does not work for overlapping form submissions
