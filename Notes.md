You can use these new hooks for SPAs but youre really meant to use them with frameworks and RSCs

RSC <-- I like it (they make a smaller bundle size, because they dont have as much to hydrates)
RSC come with a lot of adjacent tech (especially related to mutations and forms) <-- I hate it

# Data Fetching (how you GET things)

- loaders

# Forms (mutations, POST, DELETE, PUT)

- With onSubmit, we can do anything we want but with overlapping submissions it's difficult
  to manage a pending that stays true for all overlapping submissions unless we use useTransition
  and that requires async startTransition which requires react 19
- With onSubmit we can do our own home-made optimistic UI
- We can use actions to handle form submissions in SPAs but if we want optimistic UI we would need to use
  useOptimistic
- We can also use useOptimistic with the onSubmit way but that requires wrapping state changes in startTransition

- For these rapid-fire overlapping submission forms:
  - We can use onSubmit or actions
  - We can get a pending status either way from useTransition()
  - We can also get the pending status via useFormStatus()
  - We can also useActionState (like useReducer for forms) but these only work with non-rapid-fire, non-overlapping
    submissions. They work with traditional fill, submit, wait forms.
