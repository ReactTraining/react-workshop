'use client'

import { LessonBody, LessonCard } from '@/components/Lesson'
import { query } from '@/utils/database'

export default async function BasicExample() {
  const products = await query('SELECT * FROM product')

  return (
    <LessonBody>
      <LessonCard>
        <div className="max-w-56 space-y-3">
          <h1 className="font-bold">Hello RSC</h1>
          <div>
            {products.map((product) => {
              return (
                <div key={product.id}>
                  {product.name}: ${product.price}
                </div>
              )
            })}
          </div>
        </div>
      </LessonCard>
    </LessonBody>
  )
}
