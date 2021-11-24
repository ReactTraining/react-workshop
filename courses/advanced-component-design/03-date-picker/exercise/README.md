# DatePicker

## ✅ Task 1: Implement a DatePickerChangeMonth component

It would be nice to have the ability to change the month of the calendar(s) but also to give the developer the freedom of choosing where the button is placed:

```jsx
<DatePicker>
  <DatePickerChangeMonth offset={1} />
  <DatePickerCalendar />
</DatePicker>
```

We'll use an "offset" approach similar to how we did `DatePickerCalendar`. An `offset` of 1 will advance the calendar one month. An `offset` of -1 will go back one month, etc.

In the `index.tsx` file, we show you were you might place these two buttons. Trade these out for instances of `DatePickerChangeMonth` elements:

```jsx
<button className="button">Previous</button>
<button className="button">Next</button>
```

In the `DatePickerChangeMonth` component, use context to get the `setBaseMonth` function and call it when the event occurs. Pay attention to the parameter that `setBaseMonth` receives. You can see that it takes a number or a "DayJS" object which we have a `D` type alias for. If you feel comfortable enough with TypeScript, then update the `DatePickerChangeMonthProps` type so that `to` does not take `any` value, but takes the same types as you'll be passing into `setBaseMonth`

## ✅ Task 2: Month Labels

Now let's make labels so we can show the user which calendar is which. It can also be based on the offset concept just like the calendars themselves:

```jsx
<DatePicker>
  <DatePickerLabel />
  <DatePickerCalendar />
  <hr />
  <DatePickerLabel offset={1} />
  <DatePickerCalendar offset={1} />
</DatePicker>
```

Get the `baseMonthFirst` from context and use this JS to make a new version based on the offset:

```js
const newMonthFirst = baseMonthFirst.add(offset, 'month').format('MMMM')
```

The format of `MMMM` will make full name months like "January". Let the developer using this component pass their own prop in for the `format`. In TypeScript, just add `format?: string` to the type definition for the props.

Here's the documentation on DayJS formats:

https://day.js.org/docs/en/display/format

## ✅ Task 3: Don't let user's choose past days

1. Add an optional `disablePastDays` boolean prop to `DatePicker`. Remember you'll need to add this prop to the type definition to accept a boolean -- just like the `selectRange` once that's already there.
2. Pass this prop down through context. Remember to add it to the type definition for context as well (where you see `type ContextType`)
3. In `DatePickerCalendar`, get this boolean value from context
4. In the `button` JSX for the calendar days, add a disabled prop (buttons can take disabled for `true` or `false`). There's already some CSS to stylize disabled days correctly. You'll want to set the value to be true if `disablePastDays` is `true` AND if `isPast` is `true`. The `isPast` variable is already made for you for other uses.

Remember, peaking at the solution file is encouraged.
