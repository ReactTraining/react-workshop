import React from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Avatar } from 'ProjectPlanner/Avatar'
import { useAuth } from 'ProjectPlanner/AuthContext'
import { useAccountUsers } from 'ProjectPlanner/hooks/dataHooks'
import { shuffle } from 'ProjectPlanner/utils'

export const ActiveUsers: React.FC = () => {
  const { user } = useAuth()
  const users = useAccountUsers(user?.accountId)

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
              return <ActiveUserItem key={user.id} avatarUrl={user.avatarUrl} name={user.name} />
            })}
      </ul>
    </div>
  )
}

type ActiveUserItemProps = {
  avatarUrl?: string | null
  name: string
}

const ActiveUserItem: React.FC<ActiveUserItemProps> = ({ avatarUrl, name }) => {
  return (
    <li className="flex items-center">
      <Avatar src={avatarUrl} size={1.5} />
      <div className="ml-2">
        <a href="#">{name}</a>
      </div>
    </li>
  )
}
