import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useShoppingCartState } from '../state/ShoppingCartState'

function ShoppingCartButton({ productId }) {
  const { addToCart, getQuantity } = useShoppingCartState()

  function handleAddToCart() {
    addToCart(productId, 1)
  }

  return getQuantity(productId) > 0 ? (
    <Link to="/checkout" className="button button-action">
      Checkout
    </Link>
  ) : (
    <button className="button" onClick={handleAddToCart}>
      Add To Cart
    </button>
  )
}

ShoppingCartButton.propTypes = {
  productId: PropTypes.number.isRequired,
}

export default ShoppingCartButton
