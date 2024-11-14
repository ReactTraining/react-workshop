import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { storage } from '../utils/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get the session from the cookie
  const session = await storage.getSession(request.headers.get('Cookie'))

  // Get the userId from the session if it exists
  let userId = session.get('userId') as string | undefined

  return { userId: userId !== undefined && parseInt(userId) }
}

export default function Index() {
  const { userId } = useLoaderData<typeof loader>()
  return userId ? <div>User ID is {userId}</div> : <div>User is not logged in</div>
}
