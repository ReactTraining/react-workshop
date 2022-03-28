# Context

For this exercise we'll be using the third-party tool `dayjs`:

```ts
dayjs('2000-01-05').format('DD/MM/YYYY')) // 05/01/2000
dayjs('2000/01/05').format('DD/MM/YYYY')) // 05/01/2000
dayjs().format('DD/MM/YYYY'))             // (Current date in DD/MM/YYYY format)
dayjs(new Date()).format('DD/MM/YYYY'))   // (Current date in DD/MM/YYYY format)

// date is a special dayjs object
const date = new dayjs()

// When you use .format() you'll get a string returned
function format(f: string, d: string, ) {
  return new dayjs(d || new Date()).format(f)
}

// If today was 2000-01-05 -- Output would be: 01
// because we didn't pass a second argument for the date
// and so the current date was used `new dayjs(new Date())`
// and for output format we asked for was just for the month
// in two digit format
format('MM')
```

If you wish to see other formatting options: https://day.js.org/docs/en/display/format

## ✅ Task 1: Understand Compound Components

First, let's understand what a compound component is. It's essentially making one visual component from several React components like this:

```jsx
<DateDisplay date="2022/11/14">
  <DateMonth format="MMMM" />
  <DateDay />,
  <DateYear />
</DateDisplay>
```

The above JSX would yield an output of: `November 14, 2022` (notice the comma in the JSX)

The main point of this is so that we can re-arrange the children components and give the developer a very nice API for making formatted dates. The default format for month is `MM` which means doing this JSX would yield something different:

```jsx
<DateDisplay date="2022/11/14">
  <DateMonth />
  <DateDay />,
  <DateYear />
</DateDisplay>
```

Yield: `11 14, 2022`

Maybe you're thinking it could have been one component like this instead?

```jsx
<DateDisplay date="2022/11/14" format="MM DD, YYYY" />
```

This would work too (and it's not a compound component). But with this "monolithic" approach, how would you also embed span tags or any other markup around the individual parts like the month, day, and year?

Only a compound component gives us the full control.

## ✅ Task 2: Create Context

In `DateDisplay.jsx` there is a context variable that needs to be passed down to all children components. Right now each child component is making its own `date` variable but we would rather pass down one from context so we can set a custom date just once like this:

```jsx
<DateDisplay date="2022/11/14">
  <DateMonth />
  <DateDay />,
  <DateYear />
</DateDisplay>
```

Then each of `<DateMonth />`, `<DateDay />`, `<DateYear />` can retrieve that context value to use.

1. Create a context variable:

```js
const DateContext = createContext()
```

2. Create a provider around the `children` prop:

```jsx
<DateContext.Provider value={context}>{children}</DateContext.Provider>
```

3. Consume the context

```jsx
// useContext will return whatever was passed into the `value` prop of the provider
const context = useContext(DateContext)

// Since the context object passed has a date property, we could do this too:
const { date } = useContext(DateContext)
```
