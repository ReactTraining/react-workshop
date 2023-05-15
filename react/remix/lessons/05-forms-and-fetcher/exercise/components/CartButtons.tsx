import { useFetcher } from '@remix-run/react'
import { Icon } from '~/components/Icon'

type AddProps = {
  productId: number
  quantityInCart?: number
}

export function AddToCart({ productId, quantityInCart = 0 }: AddProps) {
  // Move code here
}

type RemoveProps = {
  productId: number
}

export function RemoveFromCart({ productId }: RemoveProps) {
  // Move code here
}
