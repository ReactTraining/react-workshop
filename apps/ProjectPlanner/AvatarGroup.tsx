import React, { useState } from 'react'
import { Avatar } from 'ProjectPlanner/Avatar'
import { api } from 'ProjectPlanner/api'
import { User } from 'ProjectPlanner/types'

type Props = {
  userIds: number[]
}

export const AvatarGroup: React.FC<Props> = ({ userIds }) => {
  const [users, setUsers] = useState<User[]>([])

  React.useEffect(() => {
    api.users.getUsersByIds(userIds).then((users) => {
      setUsers(users)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="avatar-group">
      {users.length > 0 ? (
        users?.map((user) => {
          return <Avatar key={user.id} src={user.avatarUrl} size={2} />
        })
      ) : (
        <div>nope</div>
      )}
    </div>
  )
}
