import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getSessionUser } from '../utils/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getSessionUser(request)
  return json({ user })
}

export default function () {
  const { user } = useLoaderData<typeof loader>()
  return user ? <div>User ID is {user.id}</div> : <div>User is not logged in</div>
}
