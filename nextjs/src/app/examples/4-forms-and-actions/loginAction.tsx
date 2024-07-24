'use server'
import { login } from '@/utils/login'

// export async function loginAction(formData: FormData) {
//   const username = formData.get('username') as string
//   const password = formData.get('password') as string

//   try {
//     const user = await login(username, password)
//     console.log('Server success', user)
//   } catch (err) {
//     console.log('ERR', err)
//   }
// }

export type ActionState = {
  user: null | Awaited<ReturnType<typeof login>>
  error: string
}

export async function loginAction(prevState: ActionState, formData: FormData) {
  'use server'
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  try {
    const user = await login(username, password)
    console.log('Server success', user)
    return { ...prevState, user }
  } catch (error) {
    if (typeof error !== 'string') return prevState
    return { ...prevState, error }
  }
}
