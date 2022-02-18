import { Heading } from 'course-platform/Heading'

export function Login() {
  return (
    <div className="spacing">
      <Heading>Login</Heading>
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
            Login
          </button>
        </footer>
      </form>
    </div>
  )
}
