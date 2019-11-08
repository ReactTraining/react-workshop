import api from '../api'

export async function login() {
  try {
    const user = await api.auth.login()

    if (user.github) {
      user.avatarUrl = await api.auth.getAvatarUrl(user.github)
    }

    return user
  } catch (error) {
    console.error(error)
  }
}
