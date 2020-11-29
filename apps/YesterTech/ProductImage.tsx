import * as React from "react";
import classnames from "classnames";
import { ReactFCNoChildren } from "YesterTech/types";

import "YesterTech/ProductImage.scss";

interface ProductImageProps extends React.ComponentPropsWithoutRef<"img"> {
  size?: number;
}

const ProductImage: ReactFCNoChildren<ProductImageProps> = ({
  size = 7,
  className,
  ...rest
}) => (
  <img
    className={classnames("product-image", className)}
    style={{ fontSize: `${size}rem` }}
    alt={rest.alt || ""}
    {...rest}
  />
);

export default ProductImage;
