import React from 'react'
import { Link } from 'react-router-dom'
import { FaGamepad, FaDesktop } from 'react-icons/fa'
import { GiKeyboard } from 'react-icons/gi'
import { IoIosSave } from 'react-icons/io'
import { MdSpeaker } from 'react-icons/md'
import Tiles from 'YesterTech/Tiles'
import Centered from 'YesterTech/Centered'
import 'YesterTech/ProductCategories.scss'

const CategoryTile = ({ children, icon: Icon, ...rest }) => {
  return (
    <Link className="category-tile" {...rest}>
      <span className="category-icon">
        <Icon />
      </span>
      <span className="title">{children}</span>
    </Link>
  )
}

export const CategoryComputers = (props) => {
  return (
    <CategoryTile {...props} icon={FaDesktop}>
      Computers
    </CategoryTile>
  )
}

export const CategoryAccessories = (props) => {
  return (
    <CategoryTile {...props} icon={GiKeyboard}>
      Gadgets
    </CategoryTile>
  )
}

export const CategoryStorage = (props) => {
  return (
    <CategoryTile {...props} icon={IoIosSave}>
      Storage
    </CategoryTile>
  )
}

export const CategoryGaming = (props) => {
  return (
    <CategoryTile {...props} icon={FaGamepad}>
      Games
    </CategoryTile>
  )
}

export const CategoryMusic = (props) => {
  return (
    <CategoryTile {...props} icon={MdSpeaker}>
      Music
    </CategoryTile>
  )
}

export const ProductCategories = () => {
  return (
    <Centered size={40}>
      <Tiles minSize={7}>
        <CategoryComputers to={`/products?categories=computers`} />
        <CategoryAccessories to={`/products?categories=gadgets`} />
        <CategoryStorage to={`/products?categories=storage`} />
        <CategoryGaming to={`/products?categories=games`} />
        <CategoryMusic to={`/products?categories=music`} />
      </Tiles>
    </Centered>
  )
}

export default ProductCategories
