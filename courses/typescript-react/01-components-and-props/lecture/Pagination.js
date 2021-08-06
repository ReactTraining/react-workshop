import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import classnames from 'classnames'
import queryString from 'query-string'
import 'YesterTech/Pagination.scss'

function Pagination({
  as: Component = 'div',
  path,
  totalResults,
  page = 1,
  resultsPerPage = 10,
  ...rest
}) {
  const query = queryString.parse(useLocation().search)
  const pages = Math.ceil(totalResults / resultsPerPage)

  return (
    <Component className="pagination horizontal-spacing-small" {...rest}>
      {pages > 1 &&
        Array(pages)
          .fill(null)
          .map((_, i) => {
            const newQuery = queryString.stringify({
              ...query,
              page: i + 1,
            })
            const active = page === i + 1
            return (
              <Link
                className={classnames('pagination-link', { active })}
                key={i}
                to={`${path}?${newQuery}`}
              >
                {i + 1}
              </Link>
            )
          })}
    </Component>
  )
}

export { Pagination }

function PaginationRange({ resultsPerPage, page, totalResults, query }) {
  if (!totalResults) {
    return null
  }

  const first = resultsPerPage * page - resultsPerPage + 1
  const last = resultsPerPage * page
  const range = `${first}-${last > totalResults ? totalResults : last}`

  return (
    <span className="text-small">
      Showing {range} of {totalResults}
      {query && query.length > 0 && (
        <span>
          {' : '}
          Search: <strong>{query}</strong>
        </span>
      )}
    </span>
  )
}

export { PaginationRange }
