import { FormEvent } from 'react'
import { useCheckoutStore } from './checkoutStore'
import { Input } from './Input'

export function StepContact() {
  const { data, setField, nextStep } = useCheckoutStore()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    nextStep()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-96">
      <Input
        type="text"
        className="form-field"
        aria-label="First Name"
        placeholder="First Name"
        autoComplete="off"
        value={data.firstName}
        onChange={(e) => setField('firstName', e.target.value)}
      />
      <Input
        type="text"
        className="form-field"
        aria-label="Last Name"
        placeholder="Last Name"
        autoComplete="off"
        value={data.lastName}
        onChange={(e) => setField('lastName', e.target.value)}
      />
      <Input
        type="email"
        className="form-field"
        aria-label="Email"
        placeholder="Email"
        autoComplete="off"
        value={data.email}
        onChange={(e) => setField('email', e.target.value)}
      />
      <Input
        type="tel"
        className="form-field"
        aria-label="Phone"
        placeholder="Phone"
        autoComplete="off"
        value={data.phone}
        onChange={(e) => setField('phone', e.target.value)}
      />

      <div className="flex justify-between gap-3">
        <button type="button" className="button" disabled>
          Previous
        </button>
        <button type="submit" className="button">
          Next
        </button>
      </div>
    </form>
  )
}
