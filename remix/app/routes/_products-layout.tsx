import { json } from '@remix-run/node'
import { Outlet, useLoaderData, useLocation } from '@remix-run/react'
import { Heading } from '~/components/Heading'
import { FilterLink, FilterLinkAll } from '~/components/FilterLink'
import {
  getBrands,
  getCategories,
  getProducts,
  type BrandType,
  type CategoryType,
} from '~/utils/db.server'
import { getCart } from '~/utils/cart.server'
import type { LoaderArgs } from '@remix-run/node'
import type { V2_MetaFunction } from '@remix-run/react'
import { type UnpackLoader, sortLabel } from '~/utils/helpers'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams

  const [products, brands, categories, cart] = await Promise.all([
    getProducts(searchParams),
    getBrands(),
    getCategories(),
    getCart(request),
  ])

  return json({
    products,
    brands: brands.sort(sortLabel),
    categories: categories.sort(sortLabel),
    cart,
  })
}

export type LoaderData = UnpackLoader<typeof loader>

export default function () {
  const { brands, categories } = useLoaderData() as LoaderData

  return (
    <div className="flex gap-6">
      <aside className="w-72 p-6 rounded-lg bg-white shadow-sm space-y-6">
        <FilterByBrand brands={brands} />
        <FilterByCategory categories={categories} />
        <FilterByPrice />
      </aside>
      <div className="flex-1 space-y-3">
        <Outlet />
      </div>
    </div>
  )
}

/****************************************
  Filter By Brand
*****************************************/

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

/****************************************
  Filter By Category
*****************************************/

type FilterByCategoryProps = {
  categories: CategoryType[]
}

function FilterByCategory({ categories }: FilterByCategoryProps) {
  const pathname = useLocation().pathname

  return (
    <section className="space-y-1">
      <Heading as="h2" size={4}>
        Filter By Type
      </Heading>
      <FilterLinkAll url={pathname} filter="category">
        All Types
      </FilterLinkAll>
      {categories.map((category) => {
        return (
          <FilterLink key={category.id} url={pathname} filter="category" value={category.handle}>
            {category.label}
          </FilterLink>
        )
      })}
    </section>
  )
}

/****************************************
  Filter By Price
*****************************************/

function FilterByPrice() {
  return (
    <section className="space-y-3">
      <div className="flex justify-between items-center">
        <Heading as="h2" size={4}>
          Max Price
        </Heading>
        <div className="text-brandColor">
          <b>$5000</b>
        </div>
      </div>
      <input type="range" className="block w-full" />
      <div className="flex justify-between items-center">
        <div className="text-sm">$10</div>
        <div className="text-sm">$5000</div>
      </div>
    </section>
  )
}
