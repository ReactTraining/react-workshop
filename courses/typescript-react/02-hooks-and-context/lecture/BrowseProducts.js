import * as React from 'react'
import * as queryString from 'query-string'
import { Link, useLocation } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import Heading from 'YesterTech/Heading'
import { Pagination, PaginationRange } from 'YesterTech/Pagination'
import NoResults from 'YesterTech/NoResults'
import api from 'YesterTech/api'
import usePromise from 'YesterTech/usePromise'
import BrowseProductItem from 'YesterTech/BrowseProductItem'
import { getInt } from 'YesterTech/utils'

function BrowseProducts() {
  const urlQuery = useLocation().search
  const search = React.useMemo(() => queryString.parse(urlQuery), [urlQuery])
  const page = search.page != null ? getInt(search.page, 10) : 1

  // Get Products (Paginated) and Total
  const getProducts = React.useCallback(
    () => api.products.getProducts(search, page),
    [search, page]
  )
  const [response, loading] = usePromise(getProducts)
  const products = response?.products
  const totalResults = response?.totalResults

  return (
    <div className="browse-products spacing">
      <Columns split middle>
        <Column className="spacing">
          <Heading size={1}>Products</Heading>
        </Column>
        <Column>
          {Array.isArray(products) && products.length > 0 && totalResults != null && (
            <PaginationRange
              resultsPerPage={10}
              page={page}
              totalResults={totalResults}
              query={search.q || ''}
            />
          )}
        </Column>
      </Columns>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="spacing">
          {products.map((product) => (
            <BrowseProductItem
              key={product.id}
              productId={product.id}
              name={product.name}
              imagePath={product.imagePath}
              price={product.price}
              year={product.year}
              brand={product.brand}
              category={product.category}
              condition={product.condition}
              rating={product.rating}
            />
          ))}
        </div>
      ) : (
        <NoResults>
          No Results
          {search.q && (
            <span>
              {'. '}
              <Link to="/products">Clear Search & Filters</Link>
            </span>
          )}
        </NoResults>
      )}

      {!loading && (
        <Pagination
          as="footer"
          path="/products"
          totalResults={totalResults || 0}
          page={page}
          resultsPerPage={10}
        />
      )}
    </div>
  )
}

export default BrowseProducts
