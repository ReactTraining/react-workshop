import { Heading } from '~/Heading'
import { CartProvider, useCart } from './Cart'
import classnames from 'classnames'
import { DialogConfirm } from './Dialog'
import { useState } from 'react'

export function App() {
  return (
    <CartProvider>
      <ProductDetails productId={1} />
    </CartProvider>
  )
}

/****************************************
  Start Here:
*****************************************/

type Props = {
  productId: number
}

function ProductDetails({ productId }: Props) {
  const { cart, addToCart, removeFromCart } = useCart()
  const inCart = cart.includes(productId)

  function onClick() {
    if (!inCart) {
      addToCart(productId)
    } else {
      removeFromCart(productId)
    }
  }

  return (
    <div className="space-y-3">
      <Heading>iPhone Pro Max</Heading>
      <div>Price: 1,199.00</div>
      <button className={classnames('button', { 'bg-red-600': inCart })} onClick={onClick}>
        {!inCart ? 'Add To Cart' : 'Remove From Cart'}
      </button>
      {/* <DialogConfirm
        title="Remove from Cart"
        onConfirm={() => {
          // Your code here
        }}
        onCancel={() => {
          // Your code here
        }}
        isOpen={false}
      >
        Are you sure you want to remove this item from the cart?
      </DialogConfirm> */}
    </div>
  )
}

/****************************************
  Specialization (Task Two) Here:
*****************************************/

function AddToCartButton({ productId }: { productId: number }) {
  //
}
