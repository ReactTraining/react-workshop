import * as React from 'react'
import { Link } from 'react-router-dom'
import { FaGamepad, FaDesktop } from 'react-icons/fa'
import { GiKeyboard } from 'react-icons/gi'
import { IoIosSave } from 'react-icons/io'
import { MdSpeaker } from 'react-icons/md'
import Tiles from 'YesterTech/Tiles'
import Centered from 'YesterTech/Centered'
import 'YesterTech/ProductCategories.scss'
import type { LinkProps } from 'react-router-dom'

interface FunctionComponentWithoutChildren<P = {}> {
  (props: P, context?: any): React.ReactElement<any, any> | null
  propTypes?: React.WeakValidationMap<P>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<P>
  displayName?: string
}

interface CategoryTileBaseProps extends Omit<LinkProps, 'children'> {}

interface CategoryTileProps extends CategoryTileBaseProps {
  icon: React.ElementType | React.ExoticComponent
}

const CategoryTile: React.FC<CategoryTileProps> = ({ children, icon: Icon, ...rest }) => {
  return (
    <Link className="category-tile" {...rest}>
      <span className="category-icon">
        <Icon />
      </span>
      <span className="title">{children}</span>
    </Link>
  )
}

export const CategoryComputers: FunctionComponentWithoutChildren<CategoryTileBaseProps> = (
  props
) => {
  return (
    <CategoryTile {...props} icon={FaDesktop}>
      Computers
    </CategoryTile>
  )
}

export const CategoryAccessories: FunctionComponentWithoutChildren<CategoryTileBaseProps> = (
  props
) => {
  return (
    <CategoryTile {...props} icon={GiKeyboard}>
      Gadgets
    </CategoryTile>
  )
}

export const CategoryStorage: FunctionComponentWithoutChildren<CategoryTileBaseProps> = (props) => {
  return (
    <CategoryTile {...props} icon={IoIosSave}>
      Storage
    </CategoryTile>
  )
}

export const CategoryGaming: FunctionComponentWithoutChildren<CategoryTileBaseProps> = (props) => {
  return (
    <CategoryTile {...props} icon={FaGamepad}>
      Games
    </CategoryTile>
  )
}

export const CategoryMusic: FunctionComponentWithoutChildren<CategoryTileBaseProps> = (props) => {
  return (
    <CategoryTile {...props} icon={MdSpeaker}>
      Music
    </CategoryTile>
  )
}

export const ProductCategories: FunctionComponentWithoutChildren = () => {
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
