import React, { Fragment } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { MdShoppingCart } from 'react-icons/md'
import { Heading, Quantity } from 'workshop'
import { useShoppingCartState } from '../../state/ShoppingCartState'

function ViewCart() {
  const { cart, addToCart, getCartTotal } = useShoppingCartState()

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
                <Quantity onChange={q => addToCart(item.productId, q)} quantity={item.quantity} />
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
      <Columns split>
        <Column>
          <strong>Total</strong>
        </Column>
        <Column>
          <strong>${getCartTotal().toFixed(2)}</strong>
        </Column>
      </Columns>

      <hr />

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
