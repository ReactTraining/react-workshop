import React, { useState, Fragment } from 'react'
import Quantity from './Quantity'
import ProductImage from 'YesterTech/ProductImage'
import { MdShoppingCart } from 'react-icons/md'

function BrowseProductItem(props) {
  const [inCart, setInCart] = useState(false)

  return (
    <div className="browse-product-item">
      <ProductImage src={props.imagePath} size={7} alt={props.name} />
      <div>{props.name}</div>
      <div>
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
