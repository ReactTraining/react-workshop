import { json, defer } from '@remix-run/node'
import { sleep } from '~/utils/helpers'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

const getAuth = () => Promise.resolve({ user: {} })
const getProduct = () => Promise.resolve({ name: 'iPhone' })
const getProductComments = () => Promise.resolve(['Good Phone']).then(sleep(3000))

export const loader = async () => {
  const [user, product, comments] = await Promise.all([
    getAuth(),
    getProduct(),
    getProductComments(),
  ])

  return json({ user, product, comments })
}

export default function ProductProfile() {
  const { user, product, comments } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>{product.name}</h1>
      <div>Comments: {comments[0]}</div>
    </div>
  )
}
