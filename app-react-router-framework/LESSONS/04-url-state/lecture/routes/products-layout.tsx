import { useId } from 'react'
import { Link, Outlet, useLocation, useSearchParams, type LoaderFunctionArgs } from 'react-router'
import { Heading } from '~/components/Heading'
import { getBrands, getProducts } from '~/utils/db.server'
import { sortLabel } from '~/utils/helpers'
import { Icon } from '~/components/Icon'
import type { Route } from './+types/products-layout'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [products, brands] = await Promise.all([getProducts(), getBrands()])

  return {
    products,
    brands: brands.sort(sortLabel),
  }
}

export type LoaderData = Awaited<ReturnType<typeof loader>>

export default function Products({ loaderData: { brands } }: Route.ComponentProps) {
  return (
    <div className="flex gap-6">
      <aside className="w-72 p-6 rounded-lg bg-white shadow-sm space-y-6">
        <section className="space-y-1">
          <Heading as="h2" size={4}>
            Filter By Brand
          </Heading>
          {brands.map((brand) => {
            return (
              <FilterLink key={brand.id} value={brand.handle}>
                {brand.label}
              </FilterLink>
            )
          })}
        </section>
      </aside>
      <main className="flex-1 space-y-3">
        <Outlet />
      </main>
    </div>
  )
}

function FilterLink({ children, value }: { children: React.ReactNode; value: string }) {
  const id = useId()

  // useSearchParams()

  const on = false
  const url = useLocation().pathname
  const to = url

  return (
    <Link to={to} className="block">
      <input id={id} type="checkbox" className="hidden" />
      <span className="text-brandColor mr-2">
        {on ? <Icon name="checkboxOn" /> : <Icon name="checkboxOff" />}
      </span>
      <label htmlFor={id} className="cursor-pointer">
        {children}
      </label>
    </Link>
  )
}
