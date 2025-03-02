import { Link, Outlet } from 'react-router'
import { getBrands, getProducts } from '~/utils/db.server'
import { Heading } from '~/components/Heading'
import type { Route } from './+types/products-layout'

export const loader = async () => {
  // Solution for task 1
  const [products, brands] = await Promise.all([getProducts(), getBrands()])

  return {
    products,
    brands,
  }
}

export default function ProductsLayout({ loaderData: { brands } }: Route.ComponentProps) {
  // Solution for task 3: See products-home.tsx and home.tsx

  return (
    <div className="flex gap-6">
      <aside className="w-72 p-6 rounded-lg bg-white shadow-sm space-y-3">
        <Heading as="h2" size={4}>
          Filter By
        </Heading>
        <Link to="?" className="block">
          Show All
        </Link>
        {brands.map((brand) => {
          return (
            <Link key={brand.id} to={`?brand=${brand.handle}`} className="block">
              {brand.label}
            </Link>
          )
        })}
      </aside>
      <main className="flex-1 space-y-3">
        {/* Solution for task 2 (context) */}
        {/* <Outlet context={context} /> */}
        <Outlet />
      </main>
    </div>
  )
}
