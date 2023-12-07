# Context

You can skip down to Task 1. The first two sections are on how dayjs works and what a compound component is.

## How does dayjs work?

For this exercise we'll be using the third-party tool `dayjs`:

```ts
dayjs('2000-01-05').format('DD/MM/YYYY')) // 05/01/2000
dayjs('2000/01/05').format('DD/MM/YYYY')) // 05/01/2000
dayjs().format('DD/MM/YYYY'))             // (Current date in DD/MM/YYYY format)
dayjs(new Date()).format('DD/MM/YYYY'))   // (Current date in DD/MM/YYYY format)

// date is a special dayjs object
const date = new dayjs()

function formatDate(f: string, d?: string) {
  // When you use .format() you'll get a string returned
  return dayjs(d || new Date()).format(f)
}

// If today was 2000-01-05 -- Output would be: 01
formatDate('MM')
// Since we didn't pass a second argument for the date
// and so the current date was used: `dayjs(new Date())`,
// the dayjs object returned will be today. Then we just
// return today but formatted to your liking
```

If you wish to see other formatting options: https://day.js.org/docs/en/display/format

## What is a compound component?

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

## Task 1

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
const context = { date: '...' }
// These are the same, choose either one
<DateContext.Provider value={context}>{children}</DateContext.Provider>
<DateContext.Provider value={context} children={children} />
```

3. Consume the context

```jsx
// useContext will return whatever was passed into the `value` prop of the provider
const context = useContext(DateContext)
console.log(context.date)

// Since the context object passed has a date property, we could do this too:
const { date } = useContext(DateContext)
console.log(date)
```

## Finished When

The component still render's the date but it uses context
