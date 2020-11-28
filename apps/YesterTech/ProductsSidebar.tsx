import * as React from "react";
import ProductFilters from "YesterTech/ProductFilters";
import { ReactComponentWithoutChildren } from "YesterTech/types";

const ProductsSidebar: ReactComponentWithoutChildren = function ProductsSidebar() {
  return (
    <aside>
      <ProductFilters />
    </aside>
  );
}

export default ProductsSidebar;
