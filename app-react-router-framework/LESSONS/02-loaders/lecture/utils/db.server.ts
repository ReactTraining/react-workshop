export type UserSettingsType = {
  deals: 'weekly' | 'monthly' | 'holidays'
  delivery: 'door' | 'in-person'
}

export async function getUserSettings(id: number) {
  const settings: UserSettingsType = { deals: 'weekly', delivery: 'door' }
  return settings
}
