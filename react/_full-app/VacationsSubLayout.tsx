import { Outlet } from 'react-router-dom'
import { SearchVacationsForm } from '~/SearchVacationsForm'

export function VacationsSubLayout() {
  return (
    <div className="flex -m-3">
      <aside className="w-80 bg-white border-r p-6 space-y-6">
        <SearchVacationsForm />
      </aside>
      <div className="flex-1 p-3">
        <Outlet />
      </div>
    </div>
  )
}
