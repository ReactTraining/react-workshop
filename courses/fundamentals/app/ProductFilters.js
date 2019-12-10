import React, { useCallback } from 'react'
import { withRouter, useLocation, Link } from 'react-router-dom'
import queryString from 'query-string'

import api from './api'
import useApi from './useApi'
import { Heading } from 'workshop'

function ProductFilters({ location, history }) {
  const search = queryString.parse(useLocation().search) || null
  const selectedCategories = search.categories ? search.categories.split(',') : []

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
    const newSearch = { ...search, page: undefined, categories: categories.join(',') }
    history.push(`${location.pathname}?${queryString.stringify(newSearch)}`)
  }

  function getClearLink() {
    const newSearch = { ...search, page: undefined, categories: undefined }
    return `${location.pathname}?${queryString.stringify(newSearch)}`
  }

  return (
    <section className="spacing-small">
      <Heading size={3}>Category</Heading>
      {categories.map(category => {
        return (
          <div key={category}>
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
      {selectedCategories.length > 0 && (
        <div>
          <Link to={getClearLink()}>clear</Link>
        </div>
      )}
    </section>
  )
}

export default withRouter(ProductFilters)
