import { Outlet, type LoaderFunctionArgs } from 'react-router'
import { getBrands, getCategories, getProducts } from '~/utils/db.server'
import { sortLabel } from '~/utils/helpers'
import { ProductsSidebar } from '~/components/ProductsSidebar'
import type { Route } from './+types/products-layout'

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams
  const [products, brands, categories] = await Promise.all([
    getProducts(searchParams),
    getBrands(),
    getCategories(),
  ])

  return {
    products,
    brands: brands.sort(sortLabel),
    categories: categories.sort(sortLabel),
  }
}

export type LoaderData = Awaited<ReturnType<typeof loader>>

export default function ProductsLayout({
  loaderData: { brands, categories },
}: Route.ComponentProps) {
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
