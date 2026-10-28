import { useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Heading } from '~/Heading'
import { Icon } from '~/Icon'
import { Notice } from '~/Notice'
import { login, selectAuth } from './state/authSlice'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // Loading and error state for the login request live in the store
  const { loginStatus, loginError } = useSelector(selectAuth)

  function handleLogin(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username = (data.get('username') || '').toString()
    const password = (data.get('password') || '').toString()

    dispatch(login({ username, password }))
      // unwrap() gives us back a promise that rejects if the thunk was rejected
      .unwrap()
      .then(() => navigate(location.state?.from || '/'))
      .catch(() => {
        // The error is already in the store from `login.rejected`
      })
  }

  return (
    <div className="max-w-[500px] mx-auto space-y-6">
      <Heading size={2}>Login</Heading>
      <form onSubmit={handleLogin} className="space-y-3">
        <Notice>
          Login with username <b>user</b> and password <b>user</b>
        </Notice>
        {loginError && (
          <Notice type="error">
            <Icon name="warning" />
            <span className="align-middle ml-2">{loginError}</span>
          </Notice>
        )}
        <input
          name="username"
          aria-label="Username"
          type="text"
          placeholder="Username"
          className="form-field"
          autoComplete="off"
          required
        />
        <input
          name="password"
          aria-label="Password"
          type="password"
          placeholder="Password"
          className="form-field"
          required
        />
        <button type="submit" className="button" disabled={loginStatus === 'loading'}>
          {loginStatus === 'loading' ? (
            <span>Loading...</span>
          ) : (
            <>
              <Icon name="signIn" />
              <span>Login</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
