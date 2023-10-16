# Date Picker

## Goals

Allow the user to click the calendar icon and see a popup that contains our date-picker. The date-picker compound component has already been configured into `<SelectDateRange />`

## Task 1

The only file you'll need to work on is `FormField.jsx`.

The `FieldDataPicker` component has already been modified to use a popup when the icon is clicked. This is implemented with HeadlessUI. You can review their docs here if you like: https://headlessui.com/react/popover

You'll need to create an instance of `<SelectDateRange />` to be shown in the popup instead of the current default message. When the user selects dates, you need to figure out how to integrate the chosen values into Formik.

`useField()` from Formik returns an array where the third part is an object of helpers. Instead of a user typing into an input field and setting the Formik value, you can programmatically call the `helper.setValue('...')` method. Even though we have one real input field, we'll programmatically set the Formik values of `startDate` and `endDate` when `<SelectDateRange>` has values for us

You'll also see some code where we format the dates before we put them back into the input field so the user can see what they chose. Essentially, the actual `input` does nothing for us but serve as a facade for the form to be semantic: The user clicks and icon and selects dates, we show the user the dates, but the input doesn't do anything.

## Task 2 (Bonus)

The popover doesn't close itself when we select dates. HeadlessUI makes a "render props" API top give us a `close` method that we can call programmatically.

https://headlessui.com/react/popover#closing-popovers-manually

We can close the popover after the user makes their selection to the date picker. Or we can even delay the close with a timeout between the dates being chosen and the popover close (see the final)

## Finished When

We're finished when the user can fill out the form and we console log the form values of the form.
