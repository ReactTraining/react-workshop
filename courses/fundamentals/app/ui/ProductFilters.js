import React from 'react'
import { Heading } from 'workshop'

function ProductFilters() {
  return (
    <div className="spacing">
      <section className="spacing-small">
        <Heading size={3}>Category</Heading>
        <div>
          <label>
            <input type="checkbox" /> All
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" /> Games (3)
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" /> Monitors (0)
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" /> Keyboards (0)
          </label>
        </div>
      </section>
    </div>
  )
}

export default ProductFilters
