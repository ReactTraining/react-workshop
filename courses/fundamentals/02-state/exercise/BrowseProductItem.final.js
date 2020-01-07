import React, { useState, Fragment } from 'react'
import Quantity from 'YesterTech/Quantity'
import ProductImage from 'YesterTech/ProductImage'
import { MdShoppingCart } from 'react-icons/md'

function BrowseProductItem({ name, imagePath }) {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button
          className={'button' + (quantity > 0 ? ' cta-button' : '')}
          onClick={() => (quantity === 0 ? setQuantity(1) : null)}
        >
          {quantity === 0 ? (
            'Add To Cart'
          ) : (
            <Fragment>
              <MdShoppingCart /> Checkout
            </Fragment>
          )}
        </button>
        <div className="align-right">
          {quantity > 0 && (
            <Quantity
              quantity={quantity}
              onChange={quantity => {
                setQuantity(quantity)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
