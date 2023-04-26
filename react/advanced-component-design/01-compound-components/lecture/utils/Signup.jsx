import { Heading } from 'spa/Heading'

export function Signup() {
  return (
    <div className="spacing">
      <Heading>Signup</Heading>
      <form className="spacing">
        <div>
          <input
            className="form-field"
            aria-label="Username"
            type="text"
            placeholder="Username"
            autoComplete="off"
            required
          />
        </div>
        <div>
          <input
            className="form-field"
            aria-label="Password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <footer>
          <button type="submit" className="button">
            Signup
          </button>
        </footer>
      </form>
    </div>
  )
}
