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
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
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
