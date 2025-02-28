import { type LoaderFunctionArgs } from 'react-router'
import { storage } from '../utils/auth.server'
import type { Route } from './+types/home'

export async function loader({ request }: LoaderFunctionArgs) {
  // Get the session from the cookie
  const session = await storage.getSession(request.headers.get('Cookie'))

  // Get the userId from the session if it exists
  let userId = session.get('userId') as string | undefined

  return { userId: userId !== undefined && parseInt(userId) }
}

export default function Index({ loaderData: { userId } }: Route.ComponentProps) {
  return userId ? <div>User ID is {userId}</div> : <div>User is not logged in</div>
}
