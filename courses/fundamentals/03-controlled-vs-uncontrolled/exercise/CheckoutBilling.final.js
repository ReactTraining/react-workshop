import React, { useState } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'
import serializeForm from 'form-serialize'

import Heading from 'YesterTech/Heading'

function CheckoutBilling() {
  const [sameAsBilling, setSameAsBilling] = useState(false)

  const [billingName, setBillingName] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [shippingName, setShippingName] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const values = serializeForm(event.target, { hash: true })
    console.log(values)
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
            name="billingName"
            defaultValue={billingName}
            onChange={event => setBillingName(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            type="text"
            name="billingAddress"
            defaultValue={billingAddress}
            onChange={event => setBillingAddress(event.target.value)}
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            defaultChecked={sameAsBilling}
            onChange={() => setSameAsBilling(!sameAsBilling)}
          />{' '}
          Same as Billing
        </label>

        <hr />

        <div className="form-field">
          <label htmlFor="shipping:name">Name</label>
          <input
            id="shipping:name"
            type="text"
            name="shippingName"
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
            name="shippingAddress"
            value={sameAsBilling ? billingAddress : shippingAddress}
            onChange={event => setShippingAddress(event.target.value)}
            disabled={sameAsBilling}
          />
        </div>

        <hr />

        <button type="submit" className="button">
          <span>Review</span>
          <FaAngleRight />
        </button>
      </form>
    </div>
  )
}

export default CheckoutBilling
