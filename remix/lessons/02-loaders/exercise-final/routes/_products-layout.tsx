import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { getBrands, getProducts } from '~/utils/db.server'
import { Heading } from '~/components/Heading'
import { UnpackLoader } from '~/utils/helpers'

export const loader = async () => {
  // Solution for task 1
  const [products, brands] = await Promise.all([getProducts(), getBrands()])

  return json({
    products,
    brands,
  })
}

export type LoaderData = UnpackLoader<typeof loader>

export default function () {
  // Solution for task 2 (context)
  // const { products, brands } = useLoaderData<LoaderData>()
  // const context = useMemo(() => ({ products }), [products])

  // Solution for task 3 (also the pages need useRouteLoaderData())
  const { brands } = useLoaderData() as LoaderData

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
        {/* <Outlet context={context} /> */}
        <Outlet />
      </main>
    </div>
  )
}
