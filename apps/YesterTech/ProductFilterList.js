import React from 'react'
import { withRouter, useLocation, Link } from 'react-router-dom'
import queryString from 'query-string'

import Heading from 'YesterTech/Heading'

function ProductFilterList({ location, history, urlKey, list, label }) {
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
      {list.map(item => {
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

export default withRouter(ProductFilterList)
