import { FormEvent } from 'react'
import { useCheckoutStore } from './checkoutStore'
import { Input } from './Input'

export function StepPayment() {
  const { data, setField, prevStep } = useCheckoutStore()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(data)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-96">
      <Input
        type="text"
        className="form-field"
        aria-label="Name on Card"
        placeholder="Name on Card"
        autoComplete="off"
        value={data.cardName}
        onChange={(e) => setField('cardName', e.target.value)}
      />
      <Input
        type="text"
        className="form-field"
        aria-label="Card Number"
        placeholder="Card Number"
        autoComplete="off"
        value={data.cardNumber}
        onChange={(e) => setField('cardNumber', e.target.value)}
      />
      <Input
        type="text"
        className="form-field"
        aria-label="Expiration"
        placeholder="MM / YY"
        autoComplete="off"
        value={data.expiration}
        onChange={(e) => setField('expiration', e.target.value)}
      />
      <Input
        type="text"
        className="form-field"
        aria-label="CVV"
        placeholder="CVV"
        autoComplete="off"
        value={data.cvv}
        onChange={(e) => setField('cvv', e.target.value)}
      />

      <div className="flex justify-between gap-3">
        <button type="button" className="button" onClick={prevStep}>
          Previous
        </button>
        <button type="submit" className="button">
          Submit
        </button>
      </div>
    </form>
  )
}
