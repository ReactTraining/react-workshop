import { useState, useTransition } from 'react'
import { useUsers, type UserType } from './helpers/useUsers'
import { Heading } from '~/Heading'

// https://github.com/reactwg/react-18/discussions/41
// https://vercel.com/blog/how-react-18-improves-application-performance

export function App() {
  const allUsers = useUsers(5000)
  const [users, setUsers] = useState(allUsers)
  const [minLikes, setMinLikes] = useState(0)

  const [pending, startTransition] = useTransition()

  function filterUsers(newMinLikes: number) {
    setMinLikes(newMinLikes)

    if (newMinLikes !== minLikes) {
      console.time()
      const filteredUsers = allUsers?.filter((u) => u.likes >= newMinLikes)
      console.timeEnd()
      // setUsers(filteredUsers)
    }
  }

  return (
    <div className="space-y-3">
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
      <div className="space-y-3 max-h-96 overflow-scroll">
        <UserList users={users} />
      </div>
    </div>
  )
}

type Props = {
  users: UserType[]
}

// See with and without memoization (and auto-memoization ✨)
const UserList = ({ users }: Props) => {
  console.log('Re-render UserList')
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
}
