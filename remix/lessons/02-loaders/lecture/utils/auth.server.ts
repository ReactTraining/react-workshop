export type UserType = {
  id: number
  firstName: string
  lastName: string
  username: string
  email: string
  avatarUrl: string
}

export async function requireSessionUser(request: Request) {
  const user: UserType = {
    id: 1,
    firstName: 'Bruce',
    lastName: 'Lee',
    username: 'brucelee',
    email: 'bruce@remix.run',
    avatarUrl: 'https://avatars.githubusercontent.com/u/2272118?v=4',
  }
  return user
}
