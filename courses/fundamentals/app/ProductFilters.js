import React, { useState, useMemo } from 'react'
import { withRouter, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { Heading } from 'workshop'

function ProductFilters({ path, history }) {
  const urlQuery = useLocation().search
  const search = useMemo(() => queryString.parse(urlQuery), [urlQuery])
  const [categories, setCategories] = useState(search.category || '')

  const isChecked = c => {
    if (search.category && categories.includes(c)) return true
    return false
  }

  const toggleCategory = e => {
    let toggled = e.target.name
    let selectedCategories = categories.split(',')
    if (selectedCategories.includes(toggled)) {
      selectedCategories = selectedCategories.filter(e => e !== toggled)
    } else {
      selectedCategories.push(toggled)
    }

    setCategories(selectedCategories.toString())
    // TODO: append to the url so it's like category=computers,gadgets
    // replace existing category=whatever
    // history.push(`${path}?`)
  }

  console.log(history.location)
  console.log(categories)

  let catNames = ['computers', 'gadgets', 'storage', 'games', 'music'] // TODO: pull from data

  return (
    <div className="spacing">
      <section className="spacing-small">
        <Heading size={3}>Category</Heading>
        <div>
          <label>
            <input type="checkbox" defaultChecked={urlQuery === ''} /> All
          </label>
        </div>
        {catNames.map(category => {
          let checked = isChecked(category)
          return (
            <div key={category + 'sidebar'}>
              <label>
                <input
                  type="checkbox"
                  onChange={toggleCategory}
                  defaultChecked={checked}
                  name={category}
                />{' '}
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default withRouter(ProductFilters)
