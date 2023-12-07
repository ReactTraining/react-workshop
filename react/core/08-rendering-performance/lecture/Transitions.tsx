import { useState, memo, useTransition, useCallback, useDeferredValue } from 'react'
import { useUsers, type UserType } from './helpers/useUsers'
import { Card } from '~/Card'
import { Heading } from '~/Heading'

// https://github.com/reactwg/react-18/discussions/41
// https://vercel.com/blog/how-react-18-improves-application-performance

export function App() {
  const allUsers = useUsers(5000)

  const [users, setUsers] = useState(allUsers)
  const [minLikes, setMinLikes] = useState(0)

  const [pending, startTransition] = useTransition()

  function filterUsers(newMinLikes: number) {
    setMinLikes(newMinLikes) // high priority (default)

    if (newMinLikes !== minLikes) {
      const filteredUsers = allUsers?.filter((u) => u.likes >= newMinLikes)
      // startTransition(() => {
      setUsers(filteredUsers) // low
      // })
    }
  }

  const editUser = useCallback(
    () => (userId: number) => {
      // start editing the user
    },
    []
  )

  return (
    <Card className="space-y-6">
      <header className="flex justify-between">
        <div>
          <Heading size={3}>{allUsers.length} Total Users</Heading>
        </div>
        <div className="space-y-3">
          <div>
            Show users with at least <b className="text-slate-800">{minLikes}</b> likes
          </div>
          <input
            type="range"
            className="block w-80"
            min="0"
            max="9"
            step="any"
            defaultValue={0}
            onChange={(e) => filterUsers(parseInt(e.target.value))}
          />
          <div>
            Showing: <b className="text-slate-800">{users?.length}</b> Users
            {pending && '...'}
          </div>
        </div>
      </header>
      <hr />
      <div className="space-y-3">
        {/* Turn this into <UserList users={users} editUser={editUser} /> */}
        <UserList users={users} editUser={editUser} />
      </div>
    </Card>
  )
}

type Props = {
  users: UserType[]
  editUser(userId: number): void
}

// UserList() old list
// UserList() new list

const UserList = memo(({ users, editUser }: Props) => {
  const users2 = useDeferredValue(users)

  return (
    <>
      {users.map((user) => {
        return (
          <div key={user.id} className="flex gap-6 bg-slate-100 p-4">
            <div className="flex-1">{user.name}</div>
            <div className="flex-1">Liked Vacations: {user.likes}</div>
            <button className="button">Edit User</button>
          </div>
        )
      })}
    </>
  )
})
