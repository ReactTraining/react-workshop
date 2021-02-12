import React from 'react'
import { Link } from 'react-router-dom'
import { Heading } from 'ProjectPlanner/Heading'
import { Avatar } from 'ProjectPlanner/Avatar'
import { useAuth } from 'ProjectPlanner/AuthContext'
import { useAccountUsers } from 'ProjectPlanner/hooks/dataHooks'
import { shuffle } from 'ProjectPlanner/utils.ts'

export const ActiveUsers: React.FC = () => {
  const users = useAccountUsers()

  return (
    <div className="spacing">
      <Heading size={3} as="h2">
        Active Users
      </Heading>
      <ul className="spacing-small">
        {Array.isArray(users) &&
          shuffle(users)
            .slice(0, 4)
            .map((user) => {
              return (
                <ActiveUserItem
                  key={user.id}
                  userId={user.id}
                  avatarUrl={user.avatarUrl}
                  name={user.name}
                />
              )
            })}
      </ul>
    </div>
  )
}

type ActiveUserItemProps = {
  userId: number
  avatarUrl?: string | null
  name: string
}

const ActiveUserItem: React.FC<ActiveUserItemProps> = ({ userId, avatarUrl, name }) => {
  return (
    <li className="flex items-center">
      <Avatar src={avatarUrl} size={1.5} />
      <div className="ml-2">
        <Link to={`/users/${userId}`}>{name}</Link>
      </div>
    </li>
  )
}
