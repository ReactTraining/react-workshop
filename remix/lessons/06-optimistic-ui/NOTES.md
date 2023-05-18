# Lecture Notes

## Refactor To

```tsx
export function AddToCart({ productId, quantityInCart }: AddProps) {
  const fetcher = useFetcher()

  // Optimistic UI
  let quantity = quantityInCart
  if (fetcher.formData) {
    quantity = parseInt(fetcher.formData.get('quantity') as string)
  }

  return (
    <fetcher.Form method="post" action="/cart">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={quantity + 1} />
      <button type="submit" className="button button-outline whitespace-nowrap">
        <Icon name="cart" /> {quantity > 0 && quantity}
      </button>
    </fetcher.Form>
  )
}

export function RemoveFromCart({ productId, quantityInCart }: RemoveProps) {
  const fetcher = useFetcher()

  if (quantityInCart === 0 || fetcher.formData) return null

  return (
    <fetcher.Form method="delete" action="/cart">
      <input type="hidden" name="productId" value={productId} />
      <button type="submit" className="button">
        Remove
      </button>
    </fetcher.Form>
  )
}
```

## Then refactor to:

```tsx
export function CartButtons({ productId, quantityInCart }: AddToCartButtonProps) {
  const addFetcher = useFetcher()
  const removeFetcher = useFetcher()

  // Optimistic UI
  let quantity = quantityInCart
  if (addFetcher.formData) {
    quantity = parseInt(addFetcher.formData.get('quantity') as string)
  }

  if (removeFetcher.formData) {
    quantity = 0
  }

  return (
    <>
      <addFetcher.Form method="post" action="/cart">
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value={quantity + 1} />
        <button className="button button-outline whitespace-nowrap" type="submit">
          <Icon name="cart" />
          {quantity > 0 && (
            <span className="ml-2 align-middle inline-block min-w-[1.5em]">{quantity}</span>
          )}
        </button>
      </addFetcher.Form>
      {quantity > 0 && (
        <removeFetcher.Form method="delete" action="/cart">
          <input type="hidden" name="productId" value={productId} />
          <button className="button" type="submit">
            Remove
          </button>
        </removeFetcher.Form>
      )}
    </>
  )
}
```
