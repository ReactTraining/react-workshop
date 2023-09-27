import { Heading } from '~/Heading'
import type { User } from './index'

type Props = {
  user: User
}

export function AccountPage({ user }: Props) {
  return (
    <div>
      <Heading>My Account</Heading>
      <p>You should only see this page if you're logged in</p>
    </div>
  )
}
