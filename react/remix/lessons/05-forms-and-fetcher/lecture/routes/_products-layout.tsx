import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { getBrands, getCategories, getProducts } from '~/utils/db.server'
import { UnpackLoader, sortLabel } from '~/utils/helpers'
import type { LoaderArgs } from '@remix-run/node'
import { ProductsSidebar } from '~/components/ProductsSidebar'

export const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams
  const [products, brands, categories] = await Promise.all([
    getProducts(searchParams),
    getBrands(),
    getCategories(),
  ])

  return json({
    products,
    brands: brands.sort(sortLabel),
    categories: categories.sort(sortLabel),
  })
}

export type LoaderData = UnpackLoader<typeof loader>

export default function () {
  const { brands, categories } = useLoaderData<typeof loader>()

  return (
    <div className="flex gap-6">
      <aside className="w-72 p-6 rounded-lg bg-white shadow-sm space-y-6">
        <ProductsSidebar brands={brands} categories={categories} />
      </aside>
      <main className="flex-1 space-y-3">
        <Outlet />
      </main>
    </div>
  )
}
