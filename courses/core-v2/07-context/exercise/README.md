# Context

## ✅ Task 1: Custom Context Provider

Context is already setup and working in `index.tsx`

1. Migrate the working context code from `index.tsx` into the `ThemeContext.tsx` file.

There are basically three parts to context:

- Creating the context object (outside of your components)
- The Provider JSX where the `value` prop is the data being passed down through context
- The Consumer using `useContext(/* Context Object Here*/)`

2. In the list above, the first two things can be found in `index.tsx` file near the `App` component. Migrate those into `ThemeContext.tsx` first.
3. For the third thing in that list, you'll want to open `TaskCard.tsx` where context is being consumed. You can see that `useContext` is being used and we're passing in the `ThemeContext` that used to exist in the `index.tsx` file. But now `ThemeContext` should be in the `ThemeContext.tsx` file.
4. Instead of just importing `ThemeContext` from its new location, try to make a custom hook called `useTheme` in `ThemeContext.tsx`.
5. `useTheme` will just return `useContext(ThemeContext)` so that way when `TaskCard` uses `useTheme()`, it will get the context returned. See the `.final` files if you need help on this one.
6. In the `App` component, wrap the `PrimaryLayout` in your new `ThemeProvider` instead of the provider it had before. The end result here is that we're moving the context logic away from `App`. The `App` component will have:

```tsx
// All of the context stuff has been moved out of index and into
// this ThemeProvider component. So the new App component in index
// will be very simple looking compared to before and it's JSX will
// be just this:
<ThemeProvider>
  <PrimaryLayout />
</ThemeProvider>
```

Here's what's going on - `ThemeProvider` is just an ordinary component that you're passing `PrimaryLayout` into. But inside `ThemeProvider` you're going to take the `children` (which is `PrimaryLayout`) and provide context to the `children` like this:

```tsx
export const ThemeProvider: React.FC = ({ children }) => {
  const colors = getTheme()
  return <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>
}
```

So, you're essentially creating a utility called `ThemeProvider` that can be used to provide context onto anything, and it doesn't add a bunch of code to `App` which we probably want to maintain as minimal.

## ✅ Task 2: Custom Hook for useTaskColor

If you finished the last task correctly, your context will still work and the left border of the `TaskCard` will change as the task's data changes. The `TaskDialog` and the `TaskCard` both need to have logic for figuring out their `--taskColor` CSS custom property. The `TaskDialog` has already moved it's code to a custom hook called `useTaskColor`. Implement the code for that hook by copying the code from `TaskCard`. Then in `TaskCard` use the hook instead of repeating this code.
