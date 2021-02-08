# Context

## ✅ Task 1: Basic Context

Open `App.js` (rename to .tsx if you want to try it the TypeScript way)

1. Refactor `App.js` to pass colors down to `TaskCard` via context instead of prop drilling

```js
/****************************************
  The JS way (Vanilla React)
*****************************************/

// Create a context object outside of all the components:
const ThemeContext = React.createContext()

// In App, provide context around the children. Pass any value you
// want through the `value` prop:
<ThemeContext.Provider value={colors}>
  <PrimaryLayout />
</ThemeContext.Provider>

// In any descendant component of PrimaryLayout, consume the context:
const colors = useContext(ThemeContext)


/****************************************
  The TypeScript Way
*****************************************/

// With TypeScript, the possible types for the context value must be
// established here:
const ThemeContext = React.createContext<Colors | null>(null)
```

## ✅ Bonus Task: Custom Provider

2. Create a component called `ThemeProvider` that takes a `children` prop.

3. Return the children from the component but wrap then in `<ThemeContext.Provider value={colors}>`

4. In the `App` component, wrap the `PrimaryLayout` in your new `ThemeProvider` instead of the provider it has before. The end result here is that we're moving the context logic away from `App`. The `App` component will have:

```tsx
<ThemeProvider>
  <PrimaryLayout />
</ThemeProvider>
```

Then inside `ThemeProvider`, when you did step #3, you're essentially providing context onto the children which is the `PrimaryLayout`. This is a "Custom Provider"
