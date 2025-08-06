import { Link, useLoaderData, useSearchParams, type LoaderFunctionArgs } from 'react-router'
import { useEffect, useState } from 'react'
import { Icon } from '~/components/Icon'
import { Tiles } from '~/components/Tiles'
import type { ProductType } from '~/utils/db.server'

// app.get('/path', () => {})

export async function loader() {
  const products = (await fetch('http://localhost:3333/products').then((res) =>
    res.json()
  )) as ProductType[]
  return products // wrapped standard `new Response`
}

export default function Index() {
  const products = useLoaderData<typeof loader>()

  return (
    <Tiles>
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="p-3 rounded-lg bg-white shadow-sm overflow-hidden flex flex-col"
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
                  <Link to={product.id.toString()} className="button">
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </Tiles>
  )
}
