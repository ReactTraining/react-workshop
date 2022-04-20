import { useState, useEffect } from 'react'
import { Avatar } from 'course-platform/Avatar'
import { Heading } from 'course-platform/Heading'
import { Notice } from 'course-platform/Notice'

export function useDelayedCallback(cb) {
  const [callbackValue, setCallbackValue] = useState(null)

  function queueState(callbackValue, ms) {
    // ...
  }

  return queueState
}

export const Signup = () => {
  // Form Fields
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  // Notice with Timeout
  const [showNotice, setShowNotice] = useState(false)
  // const setShowNoticeDelayed = useDelayedCallback(setShowNotice)

  // Other State
  const [loadingAvatar, setLoadingAvatar] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    setShowNotice(true)
    // setShowNoticeDelayed(false, 2000)
  }

  function fetchAvatar(username) {
    if (!username) return
    setLoadingAvatar(true)
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((user) => {
        setLoadingAvatar(false)
        if (user) {
          setAvatarUrl(user.avatar_url || '')
        }
      })
  }

  return (
    <div className="spacing">
      <Heading>Signup</Heading>
      <form onSubmit={onSubmit}>
        <div className="flex flex-gap-large">
          <div className="w-25">
            <Avatar src={avatarUrl} size={6} />
            {loadingAvatar && (
              <div className="text-small text-center">Loading Image From GitHub</div>
            )}
          </div>
          <div className="flex-1 spacing">
            {showNotice && <Notice>Form has been submitted</Notice>}

            <div>
              <label htmlFor="full-name">Full Name</label>
              <input
                type="text"
                className="form-field"
                id="full-name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-field"
                id="username"
                autoComplete="off"
                placeholder="If you use your github username, we'll load your avatar"
                onBlur={() => fetchAvatar(username)}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="text"
                className="form-field"
                id="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <footer>
              <button type="submit" className="button">
                Signup
              </button>
            </footer>
          </div>
        </div>
      </form>
    </div>
  )
}
