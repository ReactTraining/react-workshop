import React from 'react'
import { Link } from 'react-router-dom'
import { Tiles, Centered } from 'workshop'
import { FaGamepad, FaDesktop } from 'react-icons/fa'
import { GiKeyboard } from 'react-icons/gi'
import { IoIosSave } from 'react-icons/io'
import { MdSpeaker } from 'react-icons/md'

import './ProductCategories.scss'

function CategoryTile({ children, icon: Icon, ...rest }) {
  return (
    <Link className="category-tile" {...rest}>
      <span className="category-icon">
        <Icon />
      </span>
      <span className="title">{children}</span>
    </Link>
  )
}

export function CategoryComputers(props) {
  return (
    <CategoryTile {...props} icon={FaDesktop}>
      Computers
    </CategoryTile>
  )
}

export function CategoryAccessories(props) {
  return (
    <CategoryTile {...props} icon={GiKeyboard}>
      Gadgets
    </CategoryTile>
  )
}

export function CategoryStorage(props) {
  return (
    <CategoryTile {...props} icon={IoIosSave}>
      Storage
    </CategoryTile>
  )
}
export function CategoryGaming(props) {
  return (
    <CategoryTile {...props} icon={FaGamepad}>
      Games
    </CategoryTile>
  )
}

export function CategoryMusic(props) {
  return (
    <CategoryTile {...props} icon={MdSpeaker}>
      Music
    </CategoryTile>
  )
}

export default function ProductCategories() {
  return (
    <Centered size={40}>
      <Tiles minSize={7}>
        <CategoryComputers to={`/products?category=computers`} />
        <CategoryAccessories to={`/products?category=gadgets`} />
        <CategoryStorage to={`/products?category=storage`} />
        <CategoryGaming to={`/products?category=games`} />
        <CategoryMusic to={`/products?category=music`} />
      </Tiles>
    </Centered>
  )
}
