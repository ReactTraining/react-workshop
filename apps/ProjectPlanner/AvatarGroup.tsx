import React, { useState } from 'react'
import { Avatar } from 'ProjectPlanner/Avatar'
import { api } from 'ProjectPlanner/api'
import { User } from 'ProjectPlanner/types'

type Props = {
  userIds: number[]
}

export const AvatarGroup: React.FC<Props> = ({ userIds }) => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect(() => {
    let isCurrent = true
    api.users.getUsersByIds(userIds).then((users) => {
      if (!isCurrent) return
      setIsLoading(false)
      setUsers(users)
    })
    return () => {
      isCurrent = false
    }
  }, [userIds])

  return (
    <div className="avatar-group">
      {isLoading && <span>...</span>}
      {!isLoading && users?.length === 0 && <div>None Yet</div>}
      {!isLoading &&
        users &&
        users.length > 0 &&
        users.map((user) => {
          return <Avatar key={user.id} src={user.avatarUrl} size={2} />
        })}
    </div>
  )
}
