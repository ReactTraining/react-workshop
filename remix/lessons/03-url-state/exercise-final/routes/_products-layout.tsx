import { useId, useMemo } from 'react'
import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData, useLocation, useSearchParams } from '@remix-run/react'
import { Heading } from '~/components/Heading'
import { getBrands, getProducts } from '~/utils/db.server'
import { sortLabel } from '~/utils/helpers'
import { Icon } from '~/components/Icon'
import type { LoaderArgs } from '@remix-run/node'

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams
  const [products, brands] = await Promise.all([getProducts(searchParams), getBrands()])

  return json({
    products,
    brands: brands.sort(sortLabel),
  })
}

export default function () {
  const { products, brands } = useLoaderData<typeof loader>()
  const context = useMemo(() => ({ products }), [products])

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
        <Outlet context={context} />
      </main>
    </div>
  )
}

function FilterLink({ children, value }: { children: React.ReactNode; value: string }) {
  const id = useId()
  const url = useLocation().pathname

  // The current URL
  const [search] = useSearchParams()
  const urlValue = search.get('brand')?.toLowerCase().split(',')
  const on = Array.isArray(urlValue) && urlValue.includes(value.toLowerCase())

  // The next URL
  const nextSearch = new URLSearchParams(search.toString())
  const valuesFiltered = Array.isArray(urlValue) ? urlValue.filter((v) => v && v !== value) : []

  if (on) {
    nextSearch.set('brand', valuesFiltered.join(','))
  } else {
    nextSearch.set('brand', valuesFiltered.concat(value).join(','))
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
