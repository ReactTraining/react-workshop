import React from 'react'
import Heading from 'YesterTech/Heading'

function Checkout({ cart }) {
  return (
    <div>
      <Heading>Cart Review</Heading>
      <ul>
        {Array.isArray(cart) &&
          cart.map(item => (
            <li>
              {item.name}: {item.price.toFixed(2)}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Checkout
