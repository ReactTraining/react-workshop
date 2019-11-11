import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useShoppingCartState } from '../state/ShoppingCartState'

function ShoppingCartButton({ productId }) {
  const { addToCart, getQuantity } = useShoppingCartState()

  return getQuantity(productId) > 0 ? (
    <Link to="/checkout" className="button button-action">
      Checkout
    </Link>
  ) : (
    <button className="button" onClick={() => addToCart(productId, 1)}>
      Add To Cart
    </button>
  )
}

ShoppingCartButton.propTypes = {
  productId: PropTypes.number.isRequired,
}

export default ShoppingCartButton
