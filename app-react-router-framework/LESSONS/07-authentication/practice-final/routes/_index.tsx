import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from 'react-router'
import { getSessionUser } from '../utils/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getSessionUser(request)
  return { user }
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()
  return user ? <div>User ID is {user.id}</div> : <div>User is not logged in</div>
}
