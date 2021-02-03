import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from 'ProjectPlanner/types'
import { Heading } from 'ProjectPlanner/Heading'
import { Avatar } from 'ProjectPlanner/Avatar'
import { api } from 'ProjectPlanner/api'

type Props = {
  onAuthenticated?(user: User): void
}

type FormUser = Omit<User, 'id'> & { password: string }

export const SignupForm: React.FC<Props> = ({ onAuthenticated }) => {
  const [useGitHub, setUseGitHub] = useState(true)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  React.useEffect(() => {
    console.log('Keep in mind for workshops, GitHub has a rate limit of 60 requests per hour')
  }, [])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const user: FormUser = { username, name, password, avatarUrl }
    api.users.registerUser(user).then((user) => {
      onAuthenticated && onAuthenticated(user)
    })
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function searchGitHub() {
    api.auth.getGitHubUser(username).then((user) => {
      if (user) {
        setName(user.name || '')
        setAvatarUrl(user.avatar_url || '')
      }
    })
  }

  return (
    <div>
      <div className="flex">
        <div className="mr-4">
          <Avatar size={4} src={avatarUrl} />
        </div>
        <div className="flex-1 spacing-small">
          <Heading>Signup</Heading>
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
        </div>
      </div>
      <form onSubmit={handleSubmit} className="spacing">
        <div className="flex">
          <div className="flex-1">
            <input
              className="form-field"
              aria-label="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              required
              placeholder={useGitHub ? 'GitHub Username' : 'Username'}
              onKeyPress={(event) => {
                if (event.key === 'Enter' && useGitHub) {
                  event.preventDefault()
                  searchGitHub()
                }
              }}
            />
          </div>
          {useGitHub && (
            <div className="ml-4">
              <button type="button" className="button" onClick={searchGitHub}>
                Search
              </button>
            </div>
          )}
        </div>
        <div>
          <input
            className="form-field"
            aria-label="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPassword ? 'text' : 'password'}
            required
            placeholder={
              useGitHub
                ? 'Create a Password (For this local project, stored in plaintext)'
                : 'Password'
            }
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
        <input
          className="form-field"
          aria-label="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Full Name"
          disabled={useGitHub}
          required
        />
        <input
          className="form-field"
          aria-label="avatar-url"
          onChange={(e) => setAvatarUrl(e.target.value)}
          value={avatarUrl}
          type="text"
          placeholder="Avatar URL: https://"
          disabled={useGitHub}
          required
        />
        <footer className="flex-split">
          <div>
            <button type="submit" className="button">
              Signup
            </button>
          </div>
          <div>
            Have an account? <Link to="/login">Login.</Link>
          </div>
        </footer>
      </form>
    </div>
  )
}
