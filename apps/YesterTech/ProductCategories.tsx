import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { FaGamepad, FaDesktop } from 'react-icons/fa'
import { GiKeyboard } from 'react-icons/gi'
import { IoIosSave } from 'react-icons/io'
import { MdSpeaker } from 'react-icons/md'
import Tiles from 'YesterTech/Tiles'
import Centered from 'YesterTech/Centered'
import { ReactFCNoChildren } from 'YesterTech/types'

import 'YesterTech/ProductCategories.scss'

interface CategoryTileBaseProps extends Omit<LinkProps, 'children'> {}

interface CategoryTileProps extends CategoryTileBaseProps {
  icon: React.ElementType | React.ExoticComponent
}

const CategoryTile: React.FC<CategoryTileProps> = ({ children, icon: Icon, ...rest }) => (
  <Link className="category-tile" {...rest}>
    <span className="category-icon">
      <Icon />
    </span>
    <span className="title">{children}</span>
  </Link>
)

export const CategoryComputers: ReactFCNoChildren<CategoryTileBaseProps> = (
  props
): React.ReactElement => (
  <CategoryTile {...props} icon={FaDesktop}>
    Computers
  </CategoryTile>
)

export const CategoryAccessories: ReactFCNoChildren<CategoryTileBaseProps> = (
  props
): React.ReactElement => (
  <CategoryTile {...props} icon={GiKeyboard}>
    Gadgets
  </CategoryTile>
)

export const CategoryStorage: ReactFCNoChildren<CategoryTileBaseProps> = (
  props
): React.ReactElement => (
  <CategoryTile {...props} icon={IoIosSave}>
    Storage
  </CategoryTile>
)
export const CategoryGaming: ReactFCNoChildren<CategoryTileBaseProps> = (
  props
): React.ReactElement => (
  <CategoryTile {...props} icon={FaGamepad}>
    Games
  </CategoryTile>
)

export const CategoryMusic: ReactFCNoChildren<CategoryTileBaseProps> = (
  props
): React.ReactElement => (
  <CategoryTile {...props} icon={MdSpeaker}>
    Music
  </CategoryTile>
)

export const ProductCategories: ReactFCNoChildren = (): React.ReactElement => (
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

export default ProductCategories
