import * as React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { FaAngleLeft } from 'react-icons/fa'

import Heading from 'YesterTech/Heading'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'
import { CheckoutFieldsFull } from 'YesterTech/types'

interface CheckoutReviewProps {
  sameAsBilling: boolean
  fields?: Partial<CheckoutFieldsFull>
}

const CheckoutReview: React.FC<CheckoutReviewProps> = ({ sameAsBilling, fields = {} }) => {
  const { cart, getCartTotal } = useShoppingCart()

  function placeOrder() {
    console.log(fields)
  }

  if (Object.keys(fields).length === 0) {
    // For the lessons
    return (
      <div>
        Exercise Notice: Oops, did you forget you conditionally render the route for CheckoutReview?
        We see that `fields` doesn't have an data.
      </div>
    )
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Review Your Order
      </Heading>

      <Columns>
        <Column className="spacing-small" flex>
          <Heading as="h2" size={4}>
            Billing Address
          </Heading>
          <span>{fields.billingName}</span>
          <br />
          <span>{fields.billingAddress}</span>
          <br />

          {fields.billingCity && (
            <span>
              {fields.billingCity}, {fields.billingState} {fields.billingPostal}
            </span>
          )}
        </Column>
        <Column className="spacing-small" flex>
          <Heading as="h2" size={4}>
            Shipping Address
          </Heading>
          {sameAsBilling ? (
            <em>Same As Billing</em>
          ) : (
            <React.Fragment>
              <span>{fields.shippingName}</span>
              <br />
              <span>{fields.shippingAddress}</span>
              <br />

              {fields.shippingCity && (
                <span>
                  {fields.shippingCity}, {fields.shippingState} {fields.shippingPostal}
                </span>
              )}
            </React.Fragment>
          )}
        </Column>
      </Columns>

      <hr />
      <Heading as="h2" size={2}>
        Items
      </Heading>

      <div className="spacing-small">
        {cart.map((item) => (
          <React.Fragment key={item.productId}>
            <Columns gutters middle>
              <Column flex>
                <span className="no-wrap">
                  {item.name} ({item.quantity})
                </span>
              </Column>
              <Column>${(item.price * item.quantity).toFixed(2)}</Column>
            </Columns>
            <hr />
          </React.Fragment>
        ))}
      </div>

      <div className="align-right">
        <strong>Total: ${getCartTotal().toFixed(2)}</strong>
      </div>

      <Columns split>
        <Column>
          <Link className="button" to="/checkout/billing">
            <FaAngleLeft />
            <span>Billing</span>
          </Link>
        </Column>
        <Column>
          <button className="button cta-button" onClick={placeOrder}>
            Place Order
          </button>
        </Column>
      </Columns>
    </div>
  )
}

export default CheckoutReview
