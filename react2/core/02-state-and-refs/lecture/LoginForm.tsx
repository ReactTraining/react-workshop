import { Icon } from '~/Icon'

type Props = {
  onSubmit(values: any): void
}

export function LoginForm({ onSubmit }: Props) {
  function handleSubmit() {
    onSubmit({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" className="form-field" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" className="form-field" />
      </div>
      <footer>
        <button type="submit" className="button">
          Submit
        </button>
      </footer>
    </form>
  )
}
