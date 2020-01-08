import React from 'react'

function LoginForm() {
  function submit(e) {
    e.preventDefault()
  }

  return (
    <form className="spacing" onSubmit={submit}>
      <div className="form-field">
        <input aria-label="Username" type="text" placeholder="Username" required />
      </div>
      <div className="form-field">
        <input aria-label="Password" type="password" placeholder="Password" required />
      </div>
      <button className="button block" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
