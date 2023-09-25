import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

export function AccountSidebar() {
  return (
    <aside className="w-80 bg-white border-r p-6 space-y-6">
      <section className="space-y-3">
        <Heading size={3}>Favorites</Heading>
        <AccountFavorites />
      </section>
    </aside>
  )
}
