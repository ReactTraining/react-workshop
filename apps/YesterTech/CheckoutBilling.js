import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'

import Heading from 'YesterTech/Heading'

function CheckoutBilling({ onSubmit }) {
  const [sameAsBilling, setSameAsBilling] = useState(true)

  // Billing
  const [billingName, setBillingName] = useState()
  const [billingAddress, setBillingAddress] = useState()
  const [billingCity, setBillingCity] = useState()
  const [billingState, setBillingState] = useState()
  const [billingPostal, setBillingPostal] = useState()

  // Shipping
  const [shippingName, setShippingName] = useState()
  const [shippingAddress, setShippingAddress] = useState()
  const [shippingCity, setShippingCity] = useState()
  const [shippingState, setShippingState] = useState()
  const [shippingPostal, setShippingPostal] = useState()

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({
      billingName,
      billingAddress,
      billingCity,
      billingState,
      billingPostal,
      shippingName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPostal,
    })
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
          <input
            id="billing:name"
            type="text"
            defaultValue={billingName}
            onChange={event => setBillingName(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            type="text"
            defaultValue={billingAddress}
            onChange={event => setBillingAddress(event.target.value)}
          />
        </div>
        <Columns gutters>
          <Column>
            <div className="form-field">
              <label htmlFor="billing:city">City</label>
              <input
                id="billing:city"
                type="text"
                defaultValue={billingCity}
                onChange={event => setBillingCity(event.target.value)}
              />
            </div>
          </Column>
          <Column>
            <div className="form-field">
              <label htmlFor="billing:state">State</label>
              <input
                id="billing:state"
                type="text"
                defaultValue={billingState}
                onChange={event => setBillingState(event.target.value)}
              />
            </div>
          </Column>
          <Column>
            <div className="form-field">
              <label htmlFor="billing:postal">Postal Code</label>
              <input
                id="billing:postal"
                type="text"
                defaultValue={billingPostal}
                onChange={event => setBillingPostal(event.target.value)}
              />
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
              <input
                id="shipping:name"
                type="text"
                value={sameAsBilling ? billingName : shippingName}
                onChange={event => setShippingName(event.target.value)}
                disabled={sameAsBilling}
              />
            </div>
            <div className="form-field">
              <label htmlFor="shipping:address">Address</label>
              <input
                id="shipping:address"
                type="text"
                value={sameAsBilling ? billingAddress : shippingAddress}
                onChange={event => setShippingAddress(event.target.value)}
                disabled={sameAsBilling}
              />
            </div>
            <Columns gutters>
              <Column>
                <div className="form-field">
                  <label htmlFor="shipping:city">City</label>
                  <input
                    id="shipping:city"
                    type="text"
                    value={sameAsBilling ? billingCity : shippingCity}
                    onChange={event => setShippingCity(event.target.value)}
                    disabled={sameAsBilling}
                  />
                </div>
              </Column>
              <Column>
                <div className="form-field">
                  <label htmlFor="shipping:state">State</label>
                  <input
                    id="shipping:state"
                    type="text"
                    value={sameAsBilling ? billingState : shippingState}
                    onChange={event => setShippingState(event.target.value)}
                    disabled={sameAsBilling}
                  />
                </div>
              </Column>
              <Column>
                <div className="form-field">
                  <label htmlFor="shipping:postal">Postal Code</label>
                  <input
                    id="shipping:postal"
                    type="text"
                    value={sameAsBilling ? billingPostal : shippingPostal}
                    onChange={event => setShippingPostal(event.target.value)}
                    disabled={sameAsBilling}
                  />
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
