import type { LoaderArgs } from '@remix-run/node'
import { logout } from '~/utils/auth.server'

export async function loader({ request }: LoaderArgs) {
  return logout(request)
}
