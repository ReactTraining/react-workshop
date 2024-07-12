import { defer } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { getBrands, getCategories, getProduct, getRelatedProducts } from '~/utils/db.server'
import { sortLabel, sleep } from '~/utils/helpers'
import { ProductProfile } from '~/components/ProductProfile'
import { Tiles } from '~/components/Tiles'
import { Suspense } from 'react'
import { BrowseProductItem } from '~/components/BrowseProducts'
import { useCart } from '~/state/CartContext'
import type { LoaderFunctionArgs } from '@remix-run/node'

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const productId = parseInt(params.productId!)
  if (!productId) throw new Response('Invalid Product ID', { status: 404 })

  const [product, brands, categories] = await Promise.all([
    getProduct(productId),
    getBrands(),
    getCategories(),
  ])

  if (!product) throw new Response('Not found', { status: 404 })

  // Deferred Data
  const limit = 3
  const relatedProductsPromise = getRelatedProducts(product.brand, limit, [productId]) // .then(sleep())

  return defer({
    product,
    brands: brands.sort(sortLabel),
    categories: categories.sort(sortLabel),
    relatedProductsPromise,
  })
}

export default function Page() {
  const { product, brands, categories, relatedProductsPromise } = useLoaderData<typeof loader>()

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
