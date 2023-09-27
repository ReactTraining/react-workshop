import { useState } from 'react'

export function CartShippingBilling() {
  const [shippingName, setShippingName] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [isSame, setIsSame] = useState(false)
  const [billingName, setBillingName] = useState('')
  const [billingAddress, setBillingAddress] = useState('')

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()

    console.log({
      shippingName,
      shippingAddress,
      billingName: isSame ? shippingName : billingName,
      billingAddress: isSame ? shippingAddress : billingAddress,
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/*
        Shipping Info
      */}
      <div>
        <label htmlFor="shippingName">Shipping Name</label>
        <input
          id="shippingName"
          type="text"
          className="form-field"
          autoComplete="off"
          value={shippingName}
          onChange={(e) => setShippingName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="shippingAddress">Shipping Address</label>
        <input
          id="shippingAddress"
          type="text"
          className="form-field"
          autoComplete="off"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>

      {/*
        Billing Info
      */}
      <hr />
      <div>
        <input id="sameAs" type="checkbox" onChange={() => setIsSame(!isSame)} />{' '}
        <label htmlFor="sameAs">Billing Same as Shipping</label>
      </div>
      <div>
        <label htmlFor="billingName">Billing Name</label>
        <input
          id="billingName"
          type="text"
          className="form-field"
          autoComplete="off"
          value={isSame ? shippingName : billingName}
          onChange={(e) => setBillingName(e.target.value)}
          disabled={isSame}
        />
      </div>
      <div>
        <label htmlFor="billingAddress">Billing Address</label>
        <input
          id="billingAddress"
          type="text"
          className="form-field"
          autoComplete="off"
          value={isSame ? shippingAddress : billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          disabled={isSame}
        />
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}
