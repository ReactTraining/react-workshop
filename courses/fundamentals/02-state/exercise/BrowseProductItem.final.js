import React, { useState } from 'react'
import Quantity from './Quantity.final'
import { MdShoppingCart } from 'react-icons/md'

function BrowseProductItem(props) {
  const [quantity, setQuantity] = useState(0)

  function addToCart() {
    setQuantity(1)
  }

  return (
    <div className="browse-product-item">
      <div>
        {props.name} {quantity > 0 && `(${quantity})`}
      </div>
      <div>
        <button className="button" onClick={addToCart}>
          {!quantity ? (
            <span>Add To Cart</span>
          ) : (
            <span>
              <MdShoppingCart /> Checkout
            </span>
          )}
        </button>
      </div>
      {quantity > 0 && <Quantity quantity={quantity} setQuantity={setQuantity} />}
    </div>
  )
}

export default BrowseProductItem
