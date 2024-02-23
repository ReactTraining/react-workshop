import { useFetcher } from '@remix-run/react'
import { Icon } from '~/components/Icon'

type AddProps = {
  productId: number
  quantityInCart?: number
}

export function AddToCart({ productId, quantityInCart = 0 }: AddProps) {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method="post" action="/cart">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="quantity" value={quantityInCart + 1} />
      <button
        type="submit"
        className="button button-outline whitespace-nowrap"
        aria-label="Add To Cart"
      >
        <Icon name="cart" /> {quantityInCart > 0 && quantityInCart}
      </button>
    </fetcher.Form>
  )
}

type RemoveProps = {
  productId: number
}

export function RemoveFromCart({ productId }: RemoveProps) {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method="delete" action="/cart">
      <input type="hidden" name="productId" value={productId} />
      <button type="submit" className="button">
        Remove
      </button>
    </fetcher.Form>
  )
}
