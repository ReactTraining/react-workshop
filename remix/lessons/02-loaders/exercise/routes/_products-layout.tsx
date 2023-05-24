import { json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { getBrands } from '~/utils/db.server'
import { Heading } from '~/components/Heading'
import { UnpackLoader } from '~/utils/helpers'

export const loader = async () => {
  const brands = await getBrands()
  return json(brands)
}

export type LoaderData = UnpackLoader<typeof loader>

export default function () {
  const brands = useLoaderData<LoaderData>()

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
        <Outlet />
      </main>
    </div>
  )
}
