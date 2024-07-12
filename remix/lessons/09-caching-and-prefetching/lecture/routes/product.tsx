import { json, defer } from '@remix-run/node'
import { sleep } from '~/utils/helpers'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

const getAuth = () => Promise.resolve({ user: {} })
const getProduct = () => Promise.resolve({ name: 'iPhone' })
const getProductComments = () => Promise.resolve(['Good Phone']).then(sleep(3000))

export const loader = async () => {
  const [user, product] = await Promise.all([getAuth(), getProduct()])

  const commentsPromise = getProductComments()

  return defer({ user, product, commentsPromise })
}

export default function ProductProfile() {
  const { user, product, commentsPromise } = useLoaderData<typeof loader>()

  const comments = use(commentsPromise)

  return (
    <div>
      <h1>{product.name}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <div>Comments: {comments[0]}</div>
      </Suspense>
    </div>
  )
}
