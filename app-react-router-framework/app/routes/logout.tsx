import type { LoaderFunctionArgs } from 'react-router'
import { logout } from '~/utils/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  return logout(request)
}
