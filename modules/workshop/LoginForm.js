import React, { useRef } from 'react'

function LoginForm({ onSubmit, errorMessage }) {
  const emailRef = useRef()
  const passwordRef = useRef()

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(emailRef.current.value, passwordRef.current.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <input type="text" placeholder="Email" ref={emailRef} />
      <br />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginForm
