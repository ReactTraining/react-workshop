import { Outlet } from 'react-router-dom'
import { SearchVacationsForm } from '~/SearchVacationsForm'
import { Heading } from '~/Heading'
import { AccountFavorites } from '~/AccountFavorites'

export function VacationsSubLayout() {
  return (
    <div className="flex -m-3">
      <aside className="w-80 bg-white border-r p-6 space-y-6">
        <section>
          <SearchVacationsForm />
        </section>
        <hr />
        <section className="space-y-3">
          <Heading size={3}>Favorites</Heading>
          <AccountFavorites />
        </section>
      </aside>
      <div className="flex-1 p-3">
        <Outlet />
      </div>
    </div>
  )
}
