import React from 'react'
import ReactDOM from 'react-dom'
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa'
import './styles.scss'

const products = [
  { id: 1, name: 'Mario Kart' },
  { id: 2, name: 'Donkey Kong' },
  { id: 3, name: 'Nintendo NES' },
]

function App() {
  return (
    <span>
      <FaRegStar />
      <FaRegStar />
      <FaRegStar />
      <FaRegStar />
      <FaRegStar />
    </span>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
