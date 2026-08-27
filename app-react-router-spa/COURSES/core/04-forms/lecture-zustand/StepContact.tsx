import { Input } from './Input'

export function StepContact() {
  return (
    <>
      <Input
        name="firstName"
        type="text"
        className="form-field"
        aria-label="First Name"
        placeholder="First Name"
        autoComplete="off"
      />
      <Input
        name="lastName"
        type="text"
        className="form-field"
        aria-label="Last Name"
        placeholder="Last Name"
        autoComplete="off"
      />
      <Input
        name="email"
        type="email"
        className="form-field"
        aria-label="Email"
        placeholder="Email"
        autoComplete="off"
      />
      <Input
        name="phone"
        type="tel"
        className="form-field"
        aria-label="Phone"
        placeholder="Phone"
        autoComplete="off"
      />
    </>
  )
}
