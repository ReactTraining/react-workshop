# Date Picker

## Goals

Allow the user to click the calendar icon and see a popup that contains our date-picker. The date-picker compound component has already been configured into `<SelectDateRange />`

## Task 1

The only file you'll need to work on is `FormField.jsx`.

The `FieldDataPicker` component has already been modified to use a popup when the icon is clicked. This is implemented with HeadlessUI. You can review their docs here if you like: https://headlessui.com/react/popover

You'll need to create an instance of `<SelectDateRange />` to be shown in the popup instead of the current default message. When the user selects dates, you need to figure out how to integrate the chosen values into React Hook Form.

Here are the methods you might need for the integration:

```ts
const { register, formState, setValue, getValues, trigger } = useFormContext()
```

Keep in mind that you have these variables as props: `startName` and `endName`. The `startName` value is `startDate`, the `endName` value is `endDate`

You would think that you need to somehow "pre-register" these like we did normal input fields:

```tsx
<input type="text" {...register(startName)} />
```

...BUT YOU DON'T NEED TO DO THAT

It turns out you can set values programmatically whenever you want using `setValue('field-name', 'value')`. So you won't need the `register` function at all.

However, when you do set a value with `setValue()`, this will not trigger a re-render on your component. One of the benefits of React Hook Form is that the fields are not "controlled" which means less re-renders when values are set. However the problem is now that you'll also be using `getValue('field-name')` to read the form's date values and you can see in the code that this function would need to be called on re-renders to populate the input.

Use the `trigger` function is designed to "trigger validation" after you programmatically set values. Because validation often needs a re-render to show potential errors, it will also do a re-render. We need validation and a re-render so this is perfect:

```ts
trigger(['startDate', 'endDate']) // a list of fields to trigger validation for (but also causes a re-render)
```

## Task 2 (Bonus)

The popover doesn't close itself when we select dates. HeadlessUI makes a "render props" API top give us a `close` method that we can call programmatically.

https://headlessui.com/react/popover#closing-popovers-manually

We can close the popover after the user makes their selection to the date picker. Or we can even delay the close with a timeout between the dates being chosen and the popover close (see the final)

## Finished When

We're finished when the user can fill out the form and we console log the form values of the form.

Even though there isn't a lot of code for you to write on this practice, and we did a lot of the setup for you, take a moment to acknowledge how much cool composition is going on here - thanks to the tools allowing them selves to be composable.

We have our abstractions for field wraps being used with zod and React Hook Form. We have a third-party popup tool integrated into a custom input field and shows a date picker that is built using compound components for composing the exact look of the UI that we want.
