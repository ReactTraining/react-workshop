import React from 'react'
import { useParams } from 'react-router-dom'
import { Centered } from 'ProjectPlanner/Centered'
import { Tiles } from 'ProjectPlanner/Tiles'
import { api } from 'ProjectPlanner/api'
import { useUser } from 'ProjectPlanner/hooks/dataHooks'
import { useQuery } from 'react-query'

export const UserProfile: React.FC = () => {
  const userId = parseInt(useParams<{ userId: string }>().userId)
  const user = useUser(userId)

  // Instead of useUser, use react-query to cache the `['user', userId]` key to align
  // with `AvatarGroup`:

  // const query = useQuery(['user', userId], () => api.users.getUser(userId), {
  //   staleTime: 1000 * 15, // good for demonstrating
  // })
  // const { data: user } = query

  return (
    <Centered size={50}>
      <div className="flex">
        <aside className="mr-4 w-40 spacing-large">
          <img src={user?.avatarUrl!} alt={`Picture of ${user?.name}`} style={{ width: '100%' }} />
          <div className="spacing-small">
            <Fake />
            <Fake />
            <Fake />
          </div>
          <div className="spacing-small">
            <Fake />
            <Fake />
            <Fake />
          </div>
        </aside>

        <div className="flex-1 spacing">
          <Fake className="p-2 spacing" />
          <Tiles minSize={8}>
            <Fake className="h-20" />
            <Fake className="h-20" />
            <Fake className="h-20" />
            <Fake className="h-20" />
            <Fake className="h-20" />
            <Fake className="h-20" />
            <Fake className="h-20" />
            <Fake className="h-20" />
          </Tiles>

          <div className="spacing">
            <Fake className="p-2">
              <div className="flex">
                <div className="mr-4">
                  <Fake className="w-20 h-20" />
                </div>
                <div className="flex-1">
                  <Fake className="h-20" />
                </div>
              </div>
            </Fake>
            <Fake className="p-2">
              <div className="flex">
                <div className="mr-4">
                  <Fake className="w-20 h-20" />
                </div>
                <div className="flex-1">
                  <Fake className="h-20" />
                </div>
              </div>
            </Fake>
          </div>
        </div>
      </div>
    </Centered>
  )
}

type Props = { className?: string }
const Fake: React.FC<Props> = ({ children, className }) => {
  return <div className={`fake-content ${className}`} children={children} />
}
