import { useFetcher } from '@remix-run/react'
import { Icon } from '~/components/Icon'

type AddProps = {
  productId: number
  quantityInCart: number
}
type RemoveProps = {
  productId: number
}

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
