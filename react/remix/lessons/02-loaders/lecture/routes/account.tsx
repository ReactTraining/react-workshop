import { type LoaderArgs, json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { requireSessionUser } from '../utils/auth.server'
import { getUserSettings } from '../utils/db.server'
import { Avatar } from '~/components/Avatar'

// import { UnpackLoader } from '~/utils/helpers'
// type LoaderData = UnpackLoader<typeof loader>
// useRouteLoaderData('routes/account')

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireSessionUser(request)
  const settings = await getUserSettings(user.id)

  return json({ user, settings })
}

export default function () {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div className="flex gap-6">
      <div className="w-72 flex gap-6">
        <div>
          <Avatar size={6} src={user.avatarUrl} />
        </div>
        <div className="flex-1 pt-2 space-y-3">
          <b className="text-xl">
            {user.firstName} {user.lastName}
          </b>
          <div>
            <b className="block text-xs">Username</b>
            <div>{user.username}</div>
          </div>
          <div>
            <b className="block text-xs">Email</b>
            <div>{user.email}</div>
          </div>
          <div>
            <Link to="settings">Settings</Link>
          </div>
        </div>
      </div>
      <main className="flex-1 p-6 space-y-6 bg-white shadow-sm rounded">
        <Outlet />
      </main>
    </div>
  )
}
