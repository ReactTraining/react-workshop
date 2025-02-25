import { useId } from 'react'
import { Link, Outlet, useLoaderData, useLocation, useSearchParams } from '@remix-run/react'
import { Heading } from '~/components/Heading'
import { getBrands, getProducts } from '~/utils/db.server'
import { sortLabel } from '~/utils/helpers'
import { Icon } from '~/components/Icon'
import type { LoaderFunctionArgs } from '@remix-run/node'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams
  const [products, brands] = await Promise.all([getProducts(searchParams), getBrands()])

  return {
    products,
    brands: brands.sort(sortLabel),
  }
}

export type LoaderData = typeof loader

export default function Products() {
  const { brands } = useLoaderData<LoaderData>()

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
  const url = useLocation().pathname

  // The current URL
  const [search] = useSearchParams()
  const brands = search.get('brand')?.toLowerCase().split(',') || []
  const on = brands.includes(value.toLowerCase())

  // The next URL
  const nextSearch = new URLSearchParams(search.toString())

  if (on) {
    // If currently on, built a link that would remove it
    const valuesFiltered = brands.filter((v) => v && v !== value)
    nextSearch.set('brand', valuesFiltered.join(','))
  } else {
    // If currently off, build a link that would add it
    nextSearch.set('brand', brands.concat(value).join(','))
  }

  const to = `${url}?${nextSearch.toString()}`

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
