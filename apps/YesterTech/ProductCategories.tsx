import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { FaGamepad, FaDesktop } from "react-icons/fa";
import { GiKeyboard } from "react-icons/gi";
import { IoIosSave } from "react-icons/io";
import { MdSpeaker } from "react-icons/md";
import Tiles from "YesterTech/Tiles";
import Centered from "YesterTech/Centered";
import { ReactComponentWithoutChildren } from "YesterTech/types";

import "YesterTech/ProductCategories.scss";

interface CategoryTileBaseProps extends Omit<LinkProps, "children"> {}

interface CategoryTileProps extends CategoryTileBaseProps {
  icon: React.ElementType | React.ExoticComponent;
}

const CategoryTile: React.FC<CategoryTileProps> = function CategoryTile({
  children,
  icon: Icon,
  ...rest
}) {
  return (
    <Link className="category-tile" {...rest}>
      <span className="category-icon">
        <Icon />
      </span>
      <span className="title">{children}</span>
    </Link>
  );
};

export const CategoryComputers: ReactComponentWithoutChildren<CategoryTileBaseProps> = function CategoryComputers(
  props
): React.ReactElement {
  return (
    <CategoryTile {...props} icon={FaDesktop}>
      Computers
    </CategoryTile>
  );
};

export const CategoryAccessories: ReactComponentWithoutChildren<CategoryTileBaseProps> = function CategoryAccessories(
  props
): React.ReactElement {
  return (
    <CategoryTile {...props} icon={GiKeyboard}>
      Gadgets
    </CategoryTile>
  );
};

export const CategoryStorage: ReactComponentWithoutChildren<CategoryTileBaseProps> = function CategoryStorage(
  props
): React.ReactElement {
  return (
    <CategoryTile {...props} icon={IoIosSave}>
      Storage
    </CategoryTile>
  );
};
export const CategoryGaming: ReactComponentWithoutChildren<CategoryTileBaseProps> = function CategoryGaming(
  props
): React.ReactElement {
  return (
    <CategoryTile {...props} icon={FaGamepad}>
      Games
    </CategoryTile>
  );
};

export const CategoryMusic: ReactComponentWithoutChildren<CategoryTileBaseProps> = function CategoryMusic(
  props
): React.ReactElement {
  return (
    <CategoryTile {...props} icon={MdSpeaker}>
      Music
    </CategoryTile>
  );
};

export const ProductCategories: ReactComponentWithoutChildren = function ProductCategories(): React.ReactElement {
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
  );
};

export default ProductCategories;
