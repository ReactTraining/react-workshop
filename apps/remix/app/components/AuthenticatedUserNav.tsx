import { UserType } from '~/utils/db.server'
import { Avatar } from '~/components/Avatar'

type Props = {
  user?: UserType
}

export function AuthenticatedUserNav({ user }: Props) {
  return <div>{user ? user.username : 'not logged in'}</div>
  // return <Avatar src="https://avatars.githubusercontent.com/u/2272118?v=4" />
}
