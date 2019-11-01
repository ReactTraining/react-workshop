import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      Home Page
      <br />
      <Link to="/products">Products</Link>
    </div>
  )
}

export default Home
