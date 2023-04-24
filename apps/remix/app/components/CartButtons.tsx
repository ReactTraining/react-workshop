import { useFetcher } from 'react-router-dom'
import { Icon } from '~/components/Icon'

type AddToCartButtonProps = {
  productId: number
  quantityInCart: number
}

export function AddToCartButton({ productId, quantityInCart }: AddToCartButtonProps) {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method="post" action="/cart">
      <input type="hidden" name="productId" value={productId} />
      <button className="button button-outline whitespace-nowrap" type="submit">
        <Icon name="cart" />
        {quantityInCart > 0 && <span className="ml-2 align-middle">{quantityInCart}</span>}
      </button>
    </fetcher.Form>
  )
}

type RemoveFromCartButtonProps = {
  productId: number
}

export function RemoveFromCartButton({ productId }: RemoveFromCartButtonProps) {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method="delete" action="/cart">
      <input type="hidden" name="productId" value={productId} />
      <button className="button" type="submit">
        Remove
      </button>
    </fetcher.Form>
  )
}
