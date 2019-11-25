import React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { FaAngleLeft } from 'react-icons/fa'
import { Heading } from 'workshop'

function CheckoutReview() {
  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Review Your Order
      </Heading>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <hr />

      <Columns split>
        <Column>
          <Link className="button" to="/checkout/billing">
            <FaAngleLeft />
            <span>Billing</span>
          </Link>
        </Column>
        <Column>
          <button className="button cta-button">Place Order</button>
        </Column>
      </Columns>
    </div>
  )
}

export default CheckoutReview
