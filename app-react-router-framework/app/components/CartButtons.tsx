import { useFetcher } from 'react-router'
import { Icon } from '~/components/Icon'

type AddToCartButtonProps = {
  productId: number
  quantityInCart: number
}

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
