import { LoaderArgs, json } from '@remix-run/node'
import { Link, useLoaderData, useSearchParams } from '@remix-run/react'
import { Icon } from '~/components/Icon'
import { Tiles } from '~/components/Tiles'
import { ProductType } from '~/utils/db.server'

export async function loader({ request }: LoaderArgs) {
  const products = (await fetch('http://localhost:3333/products').then((res) =>
    res.json()
  )) as ProductType[]

  console.log(request.url)

  return json(products)
}

export default function Index() {
  const products = useLoaderData<typeof loader>()

  // Won't work on the server (because of document)
  // const url = new URL(document.location.url)
  // const brand = url.searchParams.get('brand')

  // Will work on the server
  const [search] = useSearchParams()
  const brand = search.get('brand')

  return (
    <div>
      <Tiles>
        {products
          .filter((product) => (brand ? product.brand === brand?.toLowerCase() : true))
          // .sort(() => 0.5 - Math.random())
          .map((product) => {
            return (
              <div
                key={product.id}
                className="p-3 border rounded-lg bg-white overflow-hidden flex flex-col"
              >
                <img
                  src={`/images/products/${product.image}`}
                  alt={product.name}
                  className="block object-contain h-52"
                />
                <div className="space-y-3 mt-3 border-t">
                  <div className="mt-3 flex justify-between items-center">
                    <div className="">{product.name}</div>
                    <b className="block">${product.price}</b>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <button className="button button-outline whitespace-nowrap" type="submit">
                        <Icon name="cart" />
                      </button>
                    </div>
                    <div className="w-full flex flex-col">
                      <button className="button">View</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </Tiles>
    </div>
  )
}

// export async function loader({ request }: LoaderArgs) {
//   const products = (await fetch('http://localhost:3333/products').then((res) =>
//     res.json()
//   )) as ProductType[]

//   const url = new URL(request.url)
//   const brand = url.searchParams.get('brand')

//   return json(
//     products
//       .filter((product) => (brand ? product.brand === brand?.toLowerCase() : true))
//       .sort(() => 0.5 - Math.random())
//   )
// }

// export default function Index() {
//   const products = useLoaderData<typeof loader>()

//   return (
//     <div>
//       <Tiles>
//         {products.map((product) => {
//           return (
//             <div
//               key={product.id}
//               className="p-3 border rounded-lg bg-white overflow-hidden flex flex-col"
//             >
//               <img
//                 src={`/images/products/${product.image}`}
//                 alt={product.name}
//                 className="block object-contain h-52"
//               />
//               <div className="space-y-3 mt-3 border-t">
//                 <div className="mt-3 flex justify-between items-center">
//                   <div className="">{product.name}</div>
//                   <b className="block">${product.price}</b>
//                 </div>
//                 <div className="flex gap-2">
//                   <div className="flex-1">
//                     <button className="button button-outline whitespace-nowrap" type="submit">
//                       <Icon name="cart" />
//                     </button>
//                   </div>
//                   <div className="w-full flex flex-col">
//                     <button className="button">View</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )
//         })}
//       </Tiles>
//     </div>
//   )
// }
