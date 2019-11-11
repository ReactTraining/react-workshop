import React from 'react'
import './SearchBox.scss'
import { IoIosSearch } from 'react-icons/io'

function SearchBox({ placeholder }) {
  return (
    <div className="search-box">
      <IoIosSearch />
      <input type="text" placeholder={placeholder} />
    </div>
  )
}

export default SearchBox
