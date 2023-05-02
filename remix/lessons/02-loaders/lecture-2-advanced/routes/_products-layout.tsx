import { useMemo } from 'react'
import { type LoaderArgs, json } from '@remix-run/node'
import { Link, Outlet, useLoaderData } from '@remix-run/react'
import { getBrands, getProducts } from '~/utils/db.server'
import { Heading } from '~/components/Heading'

export const loader = async ({ request }: LoaderArgs) => {
  const brands = await getBrands()

  return json({
    brands,
  })
}

export default function () {
  const { brands } = useLoaderData<typeof loader>()

  return (
    <div>
      <div className="flex gap-6">
        <div className="w-72 p-6 border rounded-lg bg-white space-y-3">
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
        </div>
        <div className="flex-1 space-y-3">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

// export const loader = async ({ request }: LoaderArgs) => {
//   const searchParams = new URL(request.url).searchParams
//   const [products, brands] = await Promise.all([getProducts(searchParams), getBrands()])

//   return json({
//     products,
//     brands,
//   })
// }

// export default function () {
//   const { products, brands } = useLoaderData<typeof loader>()
//   const context = useMemo(() => ({ products }), [products])

//   return (
//     <div>
//       <div className="flex gap-6">
//         <div className="w-72 p-6 border rounded-lg bg-white space-y-3">
//           <Heading as="h2" size={4}>
//             Filter By
//           </Heading>
//           <Link to="?" className="block">
//             Show All
//           </Link>
//           {brands.map((brand) => {
//             return (
//               <Link key={brand.id} to={`?brand=${brand.handle}`} className="block">
//                 {brand.label}
//               </Link>
//             )
//           })}
//         </div>
//         <div className="flex-1 space-y-3">
//           <Outlet context={context} />
//         </div>
//       </div>
//     </div>
//   )
// }
