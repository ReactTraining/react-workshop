import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { MdShoppingCart } from 'react-icons/md'
import { useShoppingCartState } from './ShoppingCartState'

function ShoppingCartButton({ productId, name, price }) {
  const { addToCart, getQuantity } = useShoppingCartState()

  function handleAddToCart() {
    addToCart(productId, 1, name, price)
  }

  return getQuantity(productId) > 0 ? (
    <Link to="/checkout" className="button cta-button">
      <MdShoppingCart />
      <span>Checkout</span>
    </Link>
  ) : (
    <button className="button" onClick={handleAddToCart}>
      Add To Cart
    </button>
  )
}

ShoppingCartButton.propTypes = {
  productId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
}

export default ShoppingCartButton
