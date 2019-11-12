import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { IoIosSearch } from 'react-icons/io'
import './SearchBox.scss'

function SearchBox({ placeholder, path, history }) {
  const search = window.location.search
  const [query, setQuery] = useState(queryString.parse(search).q || '')

  useEffect(() => {
    setQuery(queryString.parse(search).q || '')
  }, [search])

  function handleSubmit(event) {
    event.preventDefault()
    const search = queryString.stringify({
      ...queryString.parse(window.location.search),
      q: query,
    })
    history.push(`${path}?${search}`)
  }

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <IoIosSearch />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  )
}

export default withRouter(SearchBox)
