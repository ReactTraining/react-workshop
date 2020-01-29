import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { FaAngleRight } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'

import Heading from 'YesterTech/Heading'
import Quantity from 'YesterTech/Quantity'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'

function ViewCart() {
  const { cart, updateQuantity, getCartTotal } = useShoppingCart()

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> View Cart
      </Heading>

      <div className="spacing-small">
        {cart.map(item => (
          <Fragment key={item.productId}>
            <Columns gutters middle>
              <Column>
                <Quantity
                  onChange={q => updateQuantity(item.productId, q)}
                  quantity={item.quantity}
                />
              </Column>
              <Column flex>
                <span className="no-wrap">{item.name}</span>
              </Column>
              <Column>${(item.price * item.quantity).toFixed(2)}</Column>
            </Columns>
            <hr />
          </Fragment>
        ))}
      </div>

      <div className="align-right">
        <strong>Total: ${getCartTotal().toFixed(2)}</strong>
      </div>

      <Columns split>
        <Column />
        <Column>
          <Link to="/checkout/billing" type="submit" className="button">
            <span>Billing</span>
            <FaAngleRight />
          </Link>
        </Column>
      </Columns>
    </div>
  )
}

export default ViewCart
