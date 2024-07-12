import { useFetcher } from '@remix-run/react'
import { Icon } from '~/components/Icon'

type AddProps = {
  productId: number
  quantityInCart: number
}

export function CartButtons({ productId, quantityInCart }: AddProps) {
  const addFetcher = useFetcher()
  const removeFetcher = useFetcher()

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
        <button type="submit" className="button button-outline whitespace-nowrap">
          <Icon name="cart" /> {quantity > 0 && quantity}
        </button>
      </addFetcher.Form>
      {quantity > 0 && (
        <removeFetcher.Form method="delete" action="/cart">
          <input type="hidden" name="productId" value={productId} />
          <button type="submit" className="button">
            Remove
          </button>
        </removeFetcher.Form>
      )}
    </>
  )
}
