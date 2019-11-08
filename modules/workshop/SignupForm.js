import React, { useRef } from 'react'

function SignupForm({ onSubmit, errorMessage }) {
  const nameRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const avatarUrlRef = useRef()

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(
      nameRef.current.value,
      usernameRef.current.value,
      passwordRef.current.value,
      avatarUrlRef.current.value
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <input type="text" placeholder="Name" ref={nameRef} />
      <br />
      <input type="text" placeholder="Username" ref={usernameRef} />
      <br />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <br />
      <input type="text" placeholder="Avatar URL" ref={avatarUrlRef} />
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

export default SignupForm
