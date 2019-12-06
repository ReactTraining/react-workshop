import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'
import { Heading } from 'workshop'

function CheckoutBilling({ history }) {
  const [sameAsBilling, setSameAsBilling] = useState(true)

  function handleSubmit(event) {
    event.preventDefault()
    history.push('/checkout/review')
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing & Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing:name">Name</label>
          <input id="billing:name" type="text" />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input id="billing:address" type="text" />
        </div>
        <Columns gutters>
          <Column>
            <div className="form-field">
              <label htmlFor="billing:city">City</label>
              <input id="billing:city" type="text" />
            </div>
          </Column>
          <Column>
            <div className="form-field">
              <label htmlFor="billing:state">State</label>
              <input id="billing:state" type="text" />
            </div>
          </Column>
          <Column>
            <div className="form-field">
              <label htmlFor="billing:postal">Postal Code</label>
              <input id="billing:postal" type="text" />
            </div>
          </Column>
        </Columns>

        <Columns split gutters middle>
          <Column className="spacing">
            <Heading as="h2" size={3}>
              Shipping Info
            </Heading>
          </Column>
          <Column>
            <label>
              <input
                type="checkbox"
                defaultChecked={sameAsBilling}
                onChange={() => setSameAsBilling(!sameAsBilling)}
              />{' '}
              Same as Billing
            </label>
          </Column>
        </Columns>

        {!sameAsBilling && (
          <>
            <hr />
            <div className="form-field">
              <label htmlFor="shipping:name">Name</label>
              <input id="shipping:name" type="text" />
            </div>
            <div className="form-field">
              <label htmlFor="shipping:address">Address</label>
              <input id="shipping:address" type="text" />
            </div>
            <Columns gutters>
              <Column>
                <div className="form-field">
                  <label htmlFor="shipping:city">City</label>
                  <input id="shipping:city" type="text" />
                </div>
              </Column>
              <Column>
                <div className="form-field">
                  <label htmlFor="shipping:state">State</label>
                  <input id="shipping:state" type="text" />
                </div>
              </Column>
              <Column>
                <div className="form-field">
                  <label htmlFor="shipping:postal">Postal Code</label>
                  <input id="shipping:postal" type="text" />
                </div>
              </Column>
            </Columns>
          </>
        )}

        <hr />

        <Columns split>
          <Column>
            <Link className="button" to="/checkout/cart">
              <FaAngleLeft />
              <span>Cart</span>
            </Link>
          </Column>
          <Column>
            <button type="submit" className="button">
              <span>Review</span>
              <FaAngleRight />
            </button>
          </Column>
        </Columns>
      </form>
    </div>
  )
}

export default CheckoutBilling
