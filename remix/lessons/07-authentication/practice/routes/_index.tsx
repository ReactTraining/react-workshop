import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
// import { ??? } from '../utils/auth.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get the session user. Look in ../utils/auth.server
  return null
}

export default function () {
  const user = false // Use useLoaderData instead:
  // const { user } = useLoaderData<typeof loader>()
  return user ? <div>User ID is {user.id}</div> : <div>User is not logged in</div>
}
