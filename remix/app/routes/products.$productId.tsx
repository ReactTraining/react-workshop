import { defer } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { getBrands, getCategories, getProduct, getRelatedProducts } from '~/utils/db.server'
import { getCart } from '~/utils/cart.server'
import { sortLabel, sleep } from '~/utils/helpers'
import { ProductProfile } from '~/components/ProductProfile'
import { Tiles } from '~/components/Tiles'
import { Suspense } from 'react'
import { BrowseProductItem } from '~/components/BrowseProducts'
import type { LoaderArgs } from '@remix-run/node'

export const loader = async ({ params, request }: LoaderArgs) => {
  const productId = parseInt(params.productId!)
  const [product, brands, categories, cart] = await Promise.all([
    getProduct(productId),
    getBrands(),
    getCategories(),
    getCart(request),
  ])

  // Deferred Data
  const limit = 3
  const relatedProductsPromise = getRelatedProducts(product.brand, limit, [productId]).then(sleep())

  return defer({
    product,
    brands: brands.sort(sortLabel),
    categories: categories.sort(sortLabel),
    cart,
    relatedProductsPromise,
  })
}

export default function () {
  const { product, brands, categories, cart, relatedProductsPromise } =
    useLoaderData<typeof loader>()

  const quantityInCart = cart.find((c) => c.productId === product.id)?.quantity || 0
  const brandLabel = brands.find((b) => b.handle === product.brand)?.label as string
  const categoryLabel = categories.find((c) => c.handle === product.category)?.label as string

  return (
    <div className="flex gap-6">
      <aside className="w-72 p-6 border rounded-lg bg-white space-y-6">aside</aside>
      <div className="flex-1 space-y-10">
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
                        <div className="p-6 border rounded-lg bg-white">
                          <BrowseProductItem
                            key={product.id}
                            product={product}
                            quantityInCart={quantityInCart}
                          />
                        </div>
                      )
                    })}
                  </Tiles>
                )
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  )
}