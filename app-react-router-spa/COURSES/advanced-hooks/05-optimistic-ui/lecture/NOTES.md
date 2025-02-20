# Optimistic UI

Start with a basic form submission that asynchronously updates likes:

1. Add our own implementation of `optimisticLikes` with `useState`. Notice how
   `likes` becomes useless / unused. We set it but nothing uses it. We can also see
   it becomes difficult to reconcile our optimistic likes and the real likes when
   there's an error.

2. Refactor `onSubmit={submit}` to `action={action}` and now the homegrown optimistic
   likes don't work. Switching to `useOptimistic` will work though since it's made to
   work with form actions.

3. With useOptimistic, go back to `onSubmit={submit}` and it wont work. It's nice to show
   the console because it will say we can't do `useOptimistic` without a transition (which
   is what actions were giving us). We can add `startTransition` though if we want it to
   work with `onSubmit`

"Warning: An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
