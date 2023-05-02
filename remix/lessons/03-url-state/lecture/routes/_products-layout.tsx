import { useMemo } from 'react'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { Heading } from '~/components/Heading'
import { FilterLink, FilterLinkAll } from '~/components/FilterLink'
import { getBrands, getProducts, type BrandType } from '~/utils/db.server'
import { getCart } from '~/utils/cart.server'
import type { LoaderArgs } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/react'
import { sortLabel } from '~/utils/helpers'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

export const loader = async ({ request }: LoaderArgs) => {
  // const url = new URL(request.url)
  // const brand = url.searchParams.get('brand')

  const [products, brands, cart] = await Promise.all([getProducts(), getBrands(), getCart(request)])
  return json({
    products,
    brands,
    cart,
  })
}

export default function () {
  const { products, brands, cart } = useLoaderData<typeof loader>()
  const context = useMemo(() => ({ products, cart }), [])

  // Cannot be inside component (because of document and SSR)
  // const url = new URL(document.location.url)
  // const brand = url.searchParams.get('brand')

  // Can be inside component with SSR
  // const [search] = useSearchParams()
  // const brand = search.get('brand')

  return (
    <div>
      <div className="flex gap-6">
        <div className="w-72 p-6 border rounded-lg bg-white space-y-6">
          <FilterByBrand brands={brands} />
        </div>
        <div className="flex-1 space-y-3">
          <Outlet context={context} />
        </div>
      </div>
    </div>
  )
}

type FilterByBrandProps = {
  brands: BrandType[]
}

function FilterByBrand({ brands }: FilterByBrandProps) {
  const pathname = useLocation().pathname

  return (
    <section className="space-y-1">
      <Heading as="h2" size={4}>
        Filter By Brand
      </Heading>
      <FilterLinkAll url={pathname} filter="brand">
        All Brands
      </FilterLinkAll>
      {brands.map((brand) => {
        return (
          <FilterLink key={brand.id} url={pathname} filter="brand" value={brand.handle}>
            {brand.label}
          </FilterLink>
        )
      })}
    </section>
  )
}
