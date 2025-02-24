import { Outlet, useLoaderData } from 'react-router'
import { getBrands, getCategories, getProducts } from '~/utils/db.server'
import { sortLabel } from '~/utils/helpers'
import { ProductsSidebar } from '~/components/ProductsSidebar'
import type { LoaderFunctionArgs, MetaFunction } from 'react-router'

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }]
}

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

export default function () {
  const { brands, categories } = useLoaderData<typeof loader>()

  return (
    <div className="flex gap-6">
      <aside className="w-72 p-6 rounded-lg border space-y-6">
        <ProductsSidebar brands={brands} categories={categories} />
      </aside>
      <div className="flex-1 space-y-3">
        <Outlet />
      </div>
    </div>
  )
}
