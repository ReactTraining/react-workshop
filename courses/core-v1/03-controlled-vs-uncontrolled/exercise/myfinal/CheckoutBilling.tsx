import * as React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import serializeForm from 'form-serialize'
import Heading from '../../../../../apps/YesterTech/Heading'
import { FormEvent, useState } from 'react'

type CheckoutBillingProps = {
  onSubmit(...args: any): void
}

type CheckoutBillingFields = {
  billingName: string
  billingAddress: string
  shippingName: string
  shippingAddress: string
}

const CheckoutBilling = ({ onSubmit }: CheckoutBillingProps) => {
  const [sameAsBilling, setSameAsBilling] = useState(false)
  const [billingName, setBillingName] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [shippingName, setShippingName] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fields: CheckoutBillingFields = sameAsBilling
      ? { billingName, billingAddress, shippingName: billingName, shippingAddress: billingAddress }
      : { billingName, billingAddress, shippingName, shippingAddress }
    onSubmit(sameAsBilling, fields)
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing &amp; Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing:name">Billing Name</label>
          <input
            id="billing:name"
            type="text"
            required
            name="billingName"
            autoComplete="off"
            onChange={(e) => setBillingName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Billing Address</label>
          <input
            id="billing:address"
            type="text"
            required
            name="billingAddress"
            autoComplete="off"
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            checked={sameAsBilling}
            onChange={() => setSameAsBilling(!sameAsBilling)}
          />{' '}
          Same as Billing
        </label>

        <div className="form-field">
          <label htmlFor="shipping:name">Shipping Name</label>
          <input
            id="shipping:name"
            type="text"
            required
            name="shippingName"
            autoComplete="off"
            disabled={sameAsBilling}
            value={sameAsBilling ? billingName : shippingName}
            onChange={(e) => setShippingName(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping:address">Shipping Address</label>
          <input
            id="shipping:address"
            type="text"
            required
            name="shippingAddress"
            autoComplete="off"
            disabled={sameAsBilling}
            value={sameAsBilling ? billingAddress : shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
        </div>

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CheckoutBilling
