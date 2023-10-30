import type { LoaderFunctionArgs } from '@remix-run/node'
import { logout } from '~/utils/auth.server'

export async function loader({ request }: LoaderFunctionArgs) {
  return logout(request)
}
