import { useFetcher } from '@remix-run/react'
import { Icon } from '~/components/Icon'

type AddProps = {
  productId: number
  quantityInCart: number
}

export function CartButtons({ productId, quantityInCart }: AddProps) {
  const add = useFetcher()
  const remove = useFetcher()

  let quantity = quantityInCart
  if (add.formData) {
    quantity = parseInt(add.formData.get('quantity')! as string)
  }

  if (remove.formData) {
    quantity = 0
  }

  return (
    <>
      <add.Form method="post" action="/cart">
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="quantity" value={quantity + 1} />
        <button type="submit" className="button button-outline whitespace-nowrap">
          <Icon name="cart" /> {quantity > 0 && quantity}
        </button>
      </add.Form>
      {quantity > 0 && (
        <remove.Form method="delete" action="/cart">
          <input type="hidden" name="productId" value={productId} />
          <button type="submit" className="button">
            Remove
          </button>
        </remove.Form>
      )}
    </>
  )
}
