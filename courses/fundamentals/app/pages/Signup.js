import React, { useState, useEffect } from 'react'
import { Columns, Column } from 'react-flex-columns'
import VisuallyHidden from '@reach/visually-hidden'
import { Heading, Avatar } from 'workshop'
import api from '../api'
import useAuth from '../hooks/useAuth'

function Signup({ history }) {
  const { dispatch } = useAuth()
  const [useGithub, setUseGithub] = useState(true)
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    api.users.registerUser({ username, name, password, avatarUrl }).then(() => {
      dispatch({ type: 'LOGIN', user: { username, name, password, avatarUrl } })
      history.push('/products')
    })
  }

  useEffect(() => {
    let isCurrent = true
    if (useGithub && username.length > 5) {
      api.auth.getGithubUser(username).then(user => {
        if (user && isCurrent) {
          setName(user.name || '')
          setAvatarUrl(user.avatar_url || '')
        }
      })
    }
    return () => (isCurrent = false)
  }, [useGithub, username])

  return (
    <Columns gutters>
      <Column>
        <Avatar size={8} src={avatarUrl} />
      </Column>
      <Column flex>
        <Heading>Signup</Heading>
        <form onSubmit={handleSubmit} className="spacing">
          <div>
            <label>
              <input
                type="checkbox"
                defaultChecked={useGithub}
                onChange={() => setUseGithub(!useGithub)}
              />{' '}
              Use Github
            </label>
          </div>
          <hr />
          <div className="form-field">
            <VisuallyHidden>
              <label htmlFor="form-field:username">Username</label>
            </VisuallyHidden>
            <input
              id="form-field:username"
              onChange={e => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder={useGithub ? 'Github Username' : 'Username'}
            />
          </div>
          <div className="form-field">
            <VisuallyHidden>
              <label htmlFor="form-field:password">Password</label>
            </VisuallyHidden>
            <input
              id="form-field:password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password (This will not be encrypted)"
            />
          </div>
          <div className="form-field">
            <VisuallyHidden>
              <label htmlFor="form-field:name">Full Name</label>
            </VisuallyHidden>
            <input
              id="form-field:name"
              onChange={e => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              disabled={useGithub}
            />
          </div>
          <div className="form-field">
            <VisuallyHidden>
              <label htmlFor="form-field:avatar-url">Avatar URL</label>
            </VisuallyHidden>
            <input
              id="form-field:avatar-url"
              onChange={e => setAvatarUrl(e.target.value)}
              value={avatarUrl}
              type="text"
              placeholder="Avatar URL: https://"
              disabled={useGithub}
            />
          </div>
          <footer>
            <button type="submit" className="button">
              Submit
            </button>
          </footer>
        </form>
      </Column>
    </Columns>
  )
}

export default Signup
