import { Input } from './Input'

export function StepShipping() {
  return (
    <>
      <Input
        name="address"
        type="text"
        className="form-field"
        aria-label="Address"
        placeholder="Address"
        autoComplete="off"
      />
      <Input
        name="city"
        type="text"
        className="form-field"
        aria-label="City"
        placeholder="City"
        autoComplete="off"
      />
      <Input
        name="state"
        type="text"
        className="form-field"
        aria-label="State"
        placeholder="State"
        autoComplete="off"
      />
      <Input
        name="zip"
        type="text"
        className="form-field"
        aria-label="Zip"
        placeholder="Zip"
        autoComplete="off"
      />
    </>
  )
}
