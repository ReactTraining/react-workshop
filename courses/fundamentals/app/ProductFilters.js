import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { Heading } from 'workshop'

function ProductFilters() {
  const urlQuery = useLocation().search
  const search = useMemo(() => queryString.parse(urlQuery), [urlQuery])

  console.log(urlQuery)
  console.log(search.category)

  const isChecked = c => {
    if (search.category.includes(c)) return true
    return false
  }

  const addCategory = () => {
    console.log('hey ya')
  }

  return (
    <div className="spacing">
      <section className="spacing-small">
        <Heading size={3}>Category</Heading>
        <div>
          <label>
            <input type="checkbox" defaultChecked={urlQuery === ''} /> All
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              onChange={addCategory}
              defaultChecked={() => {
                console.log('ahh')
                return isChecked('computers')
              }}
            />{' '}
            Computers (0)
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" defaultChecked={() => isChecked('gadgets')} /> Gadgets (8)
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" defaultChecked={() => isChecked('storage')} /> Storage (3)
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" defaultChecked={() => isChecked('games')} /> Games (3)
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" defaultChecked={() => isChecked('music')} /> Music (10)
          </label>
        </div>
      </section>
    </div>
  )
}

export default ProductFilters
