# Context

## ✅ Task 1: Custom Context Provider

Context is already setup and working in `index.tsx`

1. Migrate the working context code from `index.tsx` into the `ThemeContext.tsx` file.

There are basically three parts to context:

- Creating the context object (outside of your components)
- The Provider JSX where the `value` prop is the data being passed down through context
- The Consumer using `useContext(/* Context Object Here*/)`

2. You can identify the first two in that list in the `index.tsx` file near the `App` component. Migrate those into `ThemeContext.tsx` first.
3. Then you'll want to open `TaskCard.tsx` where context is being consumed. You can see that `useContext` is being used and we're passing in the `ThemeContext` that used to exist in the `index.tsx` file. But now `ThemeContext` should be in the `ThemeContext.tsx` file.
4. Instead of just importing `ThemeContext` from its new location, try to make a custom hook called `useTheme` in `ThemeContext.tsx`.
5. `useTheme` will just return `useContext(ThemeContext)` so that way when `TaskCard` uses `useTheme()`, it will get the context returned. See the `.final` files if you need help on this one.
6. In the `App` component, wrap the `PrimaryLayout` in your new `ThemeProvider` instead of the provider it had before. The end result here is that we're moving the context logic away from `App`. The `App` component will have:

```tsx
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

## ✅ BONUS TASK!

Currently, `TaskCard` has to do a lot of work to turn the theme colors into a `ref` for so it can apply the right color to `--taskColor`. Imagine if we wanted to add `--taskColor` to other things and having to do this work all over again.

Let's take a look at `TaskColor` and see how it could be used as a utility.

It basically just does all that repetitive work and adds the ref to an arbitrary `div` element. This means we can take the context stuff out of `TaskCard` and just implement `TaskColor` around all the JSX.

7. Implement `TaskColor` on `TaskCard` and `TaskDialog`
