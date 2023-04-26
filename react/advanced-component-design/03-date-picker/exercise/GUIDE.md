# DatePicker

## ✅ Task 1: Make FieldDateRangePicker

Currently the form implements two input fields and an instance of `SelectDateRange` - a version of the `DatePicker` compound component. You need to build a third field that when clicked will do a popover for the `SelectDateRange` component and integrate its value into Formik upon selection.

First, take a look at `SelectDateRange`'s implementation and select two dates to see it output the two dates you chose in the console.

Then build `FieldDateRangePicker` which will use `SelectDateRange` internally:

1. We might want to start by creating the functionality to click on the input field and see the date picker. There's already an `onClick` event on the appropriate `div` element that will set some `openPopover` state. You just need to implement `SelectDateRange` in the popover.

2. In `App`, notice that we want Formik to track two pieces of data: `startDate` and `endDate`. Let's imagine we want to design `FieldDateRangePicker` so that it can be used for different forms so internally it will need to know the names of the Formik fields. Pass these string names `startDate` and `endDate` as props.

3. In `FieldDateRangePicker` you'll need to call Formik's `useField` twice, one time for each of those field names:

```js
// API: https://formik.org/docs/api/useField
const [field, meta, helpers] = useField('startDate')
const [field, meta, helpers] = useField('endDate')
```

Use the values returned to get the field's value and setter function for both fields. You might need to look up the API docs for useField to see which of `field`, `meta`, or `helpers` will help you. Also, console-logging them helps to see what they hold.

4. When a selection is made with `SelectDateRange`, set the formik values accordingly. You can peek at `SelectDateRange` and see that it only calls `onSelect` when two dates are chosen. You will be given `YYYY-MM-DD` strings from `SelectDateRange` and these are the values we want to set in Formik.

5. After selections are made, close the popover. Use a timeout to give the user a small amount of time (about 1 second) to see their selection before it closes

6. Display the chosen dates in the `FieldDateRangePicker` input field. You might notice that the field is `readOnly` because we have that `onClick` established for the containing `div` and we don't actually want the user to type into this field. You can use `dayjs('2000-01-01').format('MMM D, YYYY')` if you want to see a U.S. looking format for the date. Or chose any different format you'd like to see.

DayJS API for formatting: https://day.js.org/docs/en/display/format

7. You're finished when you can select dates, see them in the input, the popover closes, and then doing a form submission yields all the form values including your dates 🎉
