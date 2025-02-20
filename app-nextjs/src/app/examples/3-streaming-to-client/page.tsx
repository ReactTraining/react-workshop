import { Suspense } from 'react'
import { LessonBody, LessonCard } from '@/components/Lesson'
import { query } from '@/utils/database'
import { ListProducts } from './list-products'

// Refactor to send promise from server to client:
// 1. Remove await, receive in client via use()
// 2. Wrap in suspense
// 3. Remix did it first 😉

export default async function ServerComp() {
  const products = await query('SELECT * FROM product', 3000)

  return (
    <LessonBody>
      <LessonCard>
        <div className="max-w-56 space-y-3">
          <h1 className="font-bold">Hello RSC</h1>
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <ListProducts products={products} />
          {/* </Suspense> */}
        </div>
      </LessonCard>
    </LessonBody>
  )
}
