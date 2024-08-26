import { FormEvent, useState } from 'react'
import { Heading } from '~/Heading'
import { LessonCard } from '~/Lesson'

export function Checkout() {
  const [billingName, setBillingName] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [shippingName, setShippingName] = useState('')
  const [shippingAddress, setShippingAddress] = useState('')

  const [sameAsBilling, setSameAsBilling] = useState(true)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formValues = {
      billingName,
      billingAddress,
      shippingName,
      shippingAddress,
    }
    console.log(formValues)
  }

  return (
    <LessonCard>
      <Heading size={3}>Checkout</Heading>
      <form onSubmit={onSubmit} className="space-y-3 max-w-96">
        <input
          type="text"
          className="form-field"
          aria-label="Billing Name"
          placeholder="Billing Name"
          autoComplete="off"
          value={billingName}
          onChange={(e) => setBillingName(e.target.value)}
        />
        <input
          type="text"
          className="form-field"
          aria-label="Billing Address"
          placeholder="Billing Address"
          autoComplete="off"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
        />

        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={sameAsBilling}
            onChange={() => setSameAsBilling(!sameAsBilling)}
          />
          <span>Same As Billing</span>
        </div>

        <input
          type="text"
          className="form-field"
          aria-label="Shipping Name"
          placeholder="Shipping Name"
          autoComplete="off"
          disabled={sameAsBilling}
          value={sameAsBilling ? billingName : shippingName}
          onChange={(e) => setShippingName(e.target.value)}
        />
        <input
          type="text"
          className="form-field"
          aria-label="Shipping Address"
          placeholder="Shipping Address"
          autoComplete="off"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </LessonCard>
  )
}
