import React, { useState, useEffect } from 'react'
import { Columns, Column } from 'react-flex-columns'

import Heading from 'YesterTech/Heading'
import Avatar from 'YesterTech/Avatar'
import api from 'YesterTech/api'

function SignupForm({ onSignup }) {
  const [useGitHub, setUseGitHub] = useState(true)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const user = { username, name, password, avatarUrl }
    api.users.registerUser(user).then(() => {
      if (typeof onSignup === 'function') {
        onSignup(user)
      }
    })
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    let isCurrent = true
    if (useGitHub && username.length > 5) {
      api.auth.getGitHubUser(username).then(user => {
        if (user && isCurrent) {
          setName(user.name || '')
          setAvatarUrl(user.avatar_url || '')
        }
      })
    }
    return () => (isCurrent = false)
  }, [useGitHub, username])

  return (
    <Columns gutters>
      <Column>
        <Avatar size={8} src={avatarUrl} />
      </Column>
      <Column flex className="spacing">
        <Heading>Signup</Heading>
        <form onSubmit={handleSubmit} className="spacing">
          <div>
            <label>
              <input
                type="checkbox"
                defaultChecked={useGitHub}
                onChange={() => setUseGitHub(!useGitHub)}
              />{' '}
              Use GitHub
            </label>
          </div>
          <hr />
          <div className="form-field">
            <input
              aria-label="username"
              onChange={e => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder={useGitHub ? 'GitHub Username' : 'Username'}
            />
          </div>
          <div className="form-field">
            <input
              aria-label="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              type={showPassword ? 'text' : 'password'}
              placeholder={useGitHub ? 'Password (Not Your GitHub Password)' : 'Password'}
            />
            <label>
              <input
                onChange={handleShowPassword}
                defaultChecked={showPassword}
                className="passwordCheckbox"
                type="checkbox"
              />{' '}
              show password
            </label>
          </div>
          <div className="form-field">
            <input
              aria-label="name"
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              disabled={useGitHub}
            />
          </div>
          <div className="form-field">
            <input
              aria-label="avatar-url"
              onChange={e => setAvatarUrl(e.target.value)}
              value={avatarUrl}
              type="text"
              placeholder="Avatar URL: https://"
              disabled={useGitHub}
            />
          </div>
          <footer>
            <button type="submit" className="button">
              Signup
            </button>
          </footer>
        </form>
      </Column>
    </Columns>
  )
}

export default SignupForm
