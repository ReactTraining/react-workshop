import { type LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { requireSessionUser } from '../utils/auth.server'
import { getUserSettings } from '../utils/db.server'
import { Avatar } from '~/components/Avatar'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // These are currently in serial!!
  // That's okay in this case because we need the user before we get the settings
  // But you'll need to know how to load things in parallel for the exercise
  const user = await requireSessionUser(request)
  const settings = await getUserSettings(user.id)

  return json({ user, settings })
}

export type LoaderType = typeof loader

export default function Account() {
  const { user } = useLoaderData<LoaderType>()

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
