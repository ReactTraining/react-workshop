import { Input } from './Input'

export function StepPayment() {
  return (
    <>
      <Input
        name="cardName"
        type="text"
        className="form-field"
        aria-label="Name on Card"
        placeholder="Name on Card"
        autoComplete="off"
      />
      <Input
        name="cardNumber"
        type="text"
        className="form-field"
        aria-label="Card Number"
        placeholder="Card Number"
        autoComplete="off"
      />
      <Input
        name="expiration"
        type="text"
        className="form-field"
        aria-label="Expiration"
        placeholder="MM / YY"
        autoComplete="off"
      />
      <Input
        name="cvv"
        type="text"
        className="form-field"
        aria-label="CVV"
        placeholder="CVV"
        autoComplete="off"
      />
    </>
  )
}
