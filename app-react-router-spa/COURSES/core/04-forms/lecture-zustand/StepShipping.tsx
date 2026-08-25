import { FormEvent } from 'react'
import { useCheckoutStore } from './checkoutStore'
import { Input } from './Input'

export function StepShipping() {
  const { data, setField, nextStep, prevStep } = useCheckoutStore()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    nextStep()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-96">
      <Input
        type="text"
        className="form-field"
        aria-label="Address"
        placeholder="Address"
        autoComplete="off"
        value={data.address}
        onChange={(e) => setField('address', e.target.value)}
      />
      <Input
        type="text"
        className="form-field"
        aria-label="City"
        placeholder="City"
        autoComplete="off"
        value={data.city}
        onChange={(e) => setField('city', e.target.value)}
      />
      <Input
        type="text"
        className="form-field"
        aria-label="State"
        placeholder="State"
        autoComplete="off"
        value={data.state}
        onChange={(e) => setField('state', e.target.value)}
      />
      <Input
        type="text"
        className="form-field"
        aria-label="Zip"
        placeholder="Zip"
        autoComplete="off"
        value={data.zip}
        onChange={(e) => setField('zip', e.target.value)}
      />

      <div className="flex justify-between gap-3">
        <button type="button" className="button" onClick={prevStep}>
          Previous
        </button>
        <button type="submit" className="button">
          Next
        </button>
      </div>
    </form>
  )
}
