import React, { useCallback } from 'react'
import { withRouter, useLocation, Link } from 'react-router-dom'
import queryString from 'query-string'

import api from 'YesterTech/api'
import useApi from 'YesterTech/useApi'
import Heading from 'YesterTech/Heading'

function FilterList({ location, history, urlKey, items, label }) {
  const search = queryString.parse(useLocation().search) || null
  const selected = search[urlKey] ? search[urlKey].split(',') : []

  function isSelected(item) {
    return selected && selected.includes(item)
  }

  function toggleItem(e) {
    const item = e.target.name
    // Remove or Add
    const newSelected = isSelected(item)
      ? selected.filter(c => c !== item)
      : selected.concat([item])
    const newSearch = { ...search, page: undefined, [urlKey]: newSelected.join(',') }
    history.push(`${location.pathname}?${queryString.stringify(newSearch)}`)
  }

  function getClearLink() {
    const newSearch = { ...search, page: undefined, [urlKey]: undefined }
    return `${location.pathname}?${queryString.stringify(newSearch)}`
  }

  return (
    <section className="spacing-small">
      <Heading size={3}>{label}</Heading>
      {items.map(item => {
        return (
          <div key={item} className="no-wrap">
            <label title={item}>
              <input type="checkbox" onChange={toggleItem} checked={isSelected(item)} name={item} />{' '}
              <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
            </label>
          </div>
        )
      })}
      {selected.length > 0 && (
        <div className="text-small">
          <Link to={getClearLink()}>Show all {label}</Link>
        </div>
      )}
    </section>
  )
}

const FilterListEnhanced = withRouter(FilterList)

function ProductFilters() {
  const getMetaData = useCallback(api.products.getMetaData, [])
  const [meta, loading] = useApi(getMetaData)
  if (loading) return null

  const conditions = ['excellent', 'good', 'fair', 'poor']

  return (
    <div className="spacing">
      <FilterListEnhanced items={meta.categories} urlKey="categories" label="Categories" />
      <FilterListEnhanced items={meta.brands} urlKey="brands" label="Brands" />
      <FilterListEnhanced items={conditions} urlKey="conditions" label="Conditions" />
    </div>
  )
}

export default ProductFilters
