import React, { useCallback } from 'react'
import { withRouter, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import api from './api'
import useApi from './useApi'
import { Heading } from 'workshop'

function ProductFilters({ location, history }) {
  const search = queryString.parse(useLocation().search) || null
  const selectedCategories = search.categories ? search.categories.split(',') : []
  const all = selectedCategories.length === 0

  // Database Categories
  const getCategories = useCallback(api.products.getCategories, [])
  const [categories, loading] = useApi(getCategories)

  if (loading) {
    return null
  }

  function isSelected(category) {
    return selectedCategories && selectedCategories.includes(category)
  }

  function toggleCategory(e) {
    const selected = e.target.name
    // Remove or Add
    const categories = isSelected(selected)
      ? selectedCategories.filter(c => c !== selected)
      : selectedCategories.concat([selected])
    const newSearch = { ...search, categories: categories.join(',') }
    history.push(`${location.pathname}?${queryString.stringify(newSearch)}`)
  }

  function toggleAll() {
    const newSearch = { ...search }
    delete newSearch.categories
    history.push(`${location.pathname}?${queryString.stringify(newSearch)}`)
  }

  return (
    <div className="spacing">
      <section className="spacing-small">
        <Heading size={3}>Category</Heading>
        <div>
          <label>
            <input type="checkbox" checked={all} onChange={toggleAll} /> All
          </label>
        </div>
        {categories.map(category => {
          return (
            <div key={category + 'sidebar'}>
              <label>
                <input
                  type="checkbox"
                  onChange={toggleCategory}
                  checked={isSelected(category)}
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
