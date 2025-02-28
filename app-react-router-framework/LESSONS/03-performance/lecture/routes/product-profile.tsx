import { data, Await, type LoaderFunctionArgs } from 'react-router'
import { getBrands, getCategories, getProduct, getRelatedProducts } from '~/utils/db.server'
import { sleep, sortLabel } from '~/utils/helpers'
import { ProductProfile } from '~/components/ProductProfile'
import { Tiles } from '~/components/Tiles'
import { Suspense } from 'react'
import { BrowseProductItem } from '~/components/BrowseProducts'
import { useCart } from '~/state/CartContext'
import type { Route } from './+types/product-profile'

import type { HeadersArgs } from 'react-router'

const CACHE_TIME = 1000 + 10 // 10 seconds

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const productId = parseInt(params.productId!)
  if (!productId) throw new Response('Invalid Product ID', { status: 404 })

  const [product, brands, categories] = await Promise.all([
    getProduct(productId),
    getBrands(),
    getCategories(),
  ])

  if (!product) throw new Response('Not found', { status: 404 })
  const limit = 3
  const relatedProductsPromise = getRelatedProducts(product.brand, limit, [productId]).then(sleep())

  return data(
    {
      product,
      brands: brands.sort(sortLabel),
      categories: categories.sort(sortLabel),
      relatedProductsPromise,
    },
    {
      headers: {
        'Cache-Control': `public, max-age=${CACHE_TIME}, s-maxage=${CACHE_TIME}`,
      },
    }
  )
}

export function headers({ loaderHeaders }: HeadersArgs) {
  return loaderHeaders
}

// export const loader = async ({ params }: LoaderFunctionArgs) => {
//   const productId = parseInt(params.productId!)
//   if (!productId) throw new Response('Invalid Product ID', { status: 404 })

//   const [product, brands, categories] = await Promise.all([
//     getProduct(productId),
//     getBrands(),
//     getCategories(),
//   ])

//   if (!product) throw new Response('Not found', { status: 404 })

//   // NOTICE: This is an unresolved promise. The lack of await means that
//   // `relatedProductsPromise` is a promise variable being returned from
//   // the loader to the client
//   const limit = 3
//   const relatedProductsPromise = getRelatedProducts(product.brand, limit, [productId]).then(sleep())

//   return {
//     product,
//     brands: brands.sort(sortLabel),
//     categories: categories.sort(sortLabel),
//     relatedProductsPromise,
//   }
// }

export default function Page({ loaderData }: Route.ComponentProps) {
  const { product, brands, categories, relatedProductsPromise } = loaderData

  const { cart } = useCart()

  const quantityInCart = cart.find((c) => c.productId === product.id)?.quantity || 0
  const brandLabel = brands.find((b) => b.handle === product.brand)?.label as string
  const categoryLabel = categories.find((c) => c.handle === product.category)?.label as string

  return (
    <>
      <main className="p-6 border rounded-lg bg-white">
        <ProductProfile
          id={product.id}
          name={product.name}
          image={product.image}
          brand={brandLabel}
          brandHandle={product.brand}
          category={categoryLabel}
          categoryHandle={product.category}
          price={product.price}
          quantityInCart={quantityInCart}
        />
      </main>
      <div className="space-y-3">
        <div>Other Products From This Brand</div>
        <hr />
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={relatedProductsPromise}>
            {(products) => {
              return (
                <Tiles>
                  {products.map((product) => {
                    const quantityInCart =
                      cart.find((item) => item.productId === product.id)?.quantity || 0
                    return (
                      <div key={product.id} className="border rounded-lg bg-white">
                        <BrowseProductItem product={product} quantityInCart={quantityInCart} />
                      </div>
                    )
                  })}
                </Tiles>
              )
            }}
          </Await>
        </Suspense>
      </div>
    </>
  )
}
