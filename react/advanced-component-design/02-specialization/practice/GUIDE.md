# Specialization

## Goals

Implement a confirmation step on the `ProductDetails` component when the user removes an item from the shopping cart. Then make the logic for add/remove from cart with the confirmation more re-usable with specialization.

## Task 1

The only file you'll need to work on is `App.tsx`. Currently there is a working shopping cart button for a product. Implement the `DialogConfirm` component (template code provided in JSX already) so that it asks the user to confirm when they want to remove the item from the cart.

## Task 2

The amount of logic in the `ProductDetails` component to make the button work would have to be repeated in other places where we want another shopping cart button. Let's make a special `AddToCartButton` component that specializes in handling all this logic so the end result is the profile looking like this with an easy-to-use `AddToCartButton` button:

```tsx
function ProductDetails({ productId }: Props) {
  return (
    <div className="space-y-3">
      <Heading>iPhone Pro Max</Heading>
      <div>Price: 1,199.00</div>
      <AddToCartButton productId={productId} />
    </div>
  )
}
```
