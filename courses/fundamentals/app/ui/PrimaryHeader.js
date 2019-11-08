import React from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { useAuthState } from '../state/AuthState'
import Avatar from 'workshop/Avatar'
import './PrimaryHeader.scss'

function PrimaryHeader() {
  const { authenticated, user } = useAuthState()

  return (
    <Columns className="primary-header" split>
      <Column>header</Column>
      <Column>
        {authenticated ? (
          <Link to="/account">
            <Avatar src={user.avatarUrl} />
          </Link>
        ) : (
          <button>Login</button>
        )}
      </Column>
    </Columns>
  )
}

export default PrimaryHeader
