import React from 'react'

function SignupForm() {
  function submit(e) {
    e.preventDefault()
  }

  return (
    <form className="spacing" onSubmit={submit}>
      <div className="form-field">
        <input aria-label="Full Name" type="text" placeholder="Full Name" required />
      </div>
      <div className="form-field">
        <input aria-label="Username" type="text" placeholder="Username" required />
      </div>
      <div className="form-field">
        <input aria-label="Password" type="password" placeholder="Password" required />
      </div>
      <button className="button block" type="submit">
        Signup
      </button>
    </form>
  )
}

export default SignupForm
