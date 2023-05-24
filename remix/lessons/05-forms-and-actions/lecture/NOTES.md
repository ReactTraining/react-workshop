# Lecture Notes

## Login Form

Demo the basics of `<Form>` and how action is HTTP verbs besides GET.

Play with the `onSubmit` area for a bit and show different React ways to collect form values

```js
// const formData = new FormData(event.target) // works, but TS complains
const formData = new FormData(event.currentTarget)
formData.get('username)
```

Explain `Object.fromEntries(formData)`

In the action: `formData = await request.formData()`

Refactor fields to a `<FieldWrap>`

We can talk about the utility of `useId`

Show zod in the final example for validation

## Browsing Products: Two Forms one Action

Wrap the buttons in their own `<Form>` elements and submit their data to the action. Give each an `_action` form data item to differentiate requests.

Will have to eventually do for numbers

```ts
const productId = parseInt(formData.get('productId')! as string)
```

Demo `useNavigation` and the problems with getting its status for many forms:

```ts
const isSubmitting =
  navigation.state === 'submitting' &&
  navigation?.formData?.get('productId') === product.id.toString()
```

Refactor action to `request.method === 'POST` or `DELETE`.

## Fetcher

Abstract buttons to their own components to `useFetcher`

Use real cookie based `addToCart` and `removeFromCart`. Remember they setup the response so return the `await` (see final)

Compute Quantity

```ts
const quantityInCart = cart?.find((c) => c.productId === product.id)?.quantity || 0
```

Add Loader to get cart

```ts
export async function loader({ request }: LoaderArgs) {
  const cart = await getCart(request)
  return json({ cart })
}
```
