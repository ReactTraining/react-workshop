import React, { useState } from 'react'
import { Avatar } from 'ProjectPlanner/Avatar'
import { api } from 'ProjectPlanner/api'
import { User } from 'ProjectPlanner/types'
import { useQueries, useQuery } from 'react-query'

type Props = {
  userIds: number[]
}

export const AvatarGroup: React.FC<Props> = ({ userIds }) => {
  /****************************************
    The "vanilla" React way with useEffect
  *****************************************/

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

  /****************************************
    useQuery from the `react-query` lib
  *****************************************/

  // const query = useQuery(['user-list', userIds], () => api.users.getUsersByIds(userIds), {
  //   staleTime: 1000 * 15,
  // })
  // const { data: users, isLoading } = query

  /****************************************
    useQueries
  *****************************************/

  // const queries = useQueries(
  //   userIds.map((id) => {
  //     return {
  //       queryKey: ['user', id],
  //       queryFn: () => api.users.getUser(id),
  //       staleTime: 1000 * 15,
  //     }
  //   })
  // )

  // const users = queries.filter((q) => q.isLoading !== true).map((q) => q.data) as User[]
  // console.log(users)
  // const isLoading = queries.reduce((loading, next) => (next.isLoading ? true : loading), false)

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
