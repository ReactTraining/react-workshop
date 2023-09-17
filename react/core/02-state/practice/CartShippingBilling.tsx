import { useState } from 'react'

export function CartShippingBilling() {
  const [shippingName, setShippingName] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')
  const [isSame, setIsSame] = useState(false)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()

    console.log({
      shippingName: '',
      shippingAddress: '',
      billingName: '',
      billingAddress: '',
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
        <input
          id="sameAs"
          type="checkbox"
          // Toggle the `isSame` value: true/false
          // onChange={}
        />{' '}
        <label htmlFor="sameAs">Billing Same as Shipping</label>
      </div>
      <div>
        <label htmlFor="billingName">Billing Name</label>
        <input
          id="billingName"
          type="text"
          className="form-field"
          // Make "controlled"
          // value={ }
          // onChange={ }
          disabled={false} // Should match the `isSame` value
        />
      </div>
      <div>
        <label htmlFor="billingAddress">Billing Address</label>
        <input
          id="billingAddress"
          type="text"
          className="form-field"
          autoComplete="off"
          // Make "controlled"
          // value={ }
          // onChange={ }
          disabled={false} // Should match the `isSame` value
        />
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  )
}
