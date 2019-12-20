import React, { useState, Fragment } from 'react'
import Quantity from './Quantity'
import ProductImage from 'YesterTech/ProductImage'
import { MdShoppingCart } from 'react-icons/md'

function BrowseProductItem({ name, imagePath }) {
  const [inCart, setInCart] = useState(false)

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button
          className={'button' + (inCart ? ' cta-button' : '')}
          onClick={() => setInCart(true)}
        >
          {!inCart ? (
            'Add To Cart'
          ) : (
            <Fragment>
              <MdShoppingCart /> In Cart
            </Fragment>
          )}
        </button>
        <div className="align-right">
          {inCart && (
            <Quantity
              onChange={quantity => {
                if (quantity < 1) {
                  setInCart(false)
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowseProductItem
