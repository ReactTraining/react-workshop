import * as React from "react";
import api from "YesterTech/api";
import usePromise from "YesterTech/usePromise";
import ProductFilterList from "YesterTech/ProductFilterList";
import { ReactComponentWithoutChildren } from "YesterTech/types";

const ProductFilters: ReactComponentWithoutChildren = function ProductFilters(): React.ReactElement | null {
  const [meta, loading] = usePromise(
    React.useCallback(function getMetaData() {
      return api.products.getMetaData();
    }, [])
  );
  if (loading) return null;

  const conditions = ["excellent", "good", "fair", "poor"];

  return (
    <div className="spacing">
      <ProductFilterList
        list={meta?.categories}
        urlKey="categories"
        label="Categories"
      />
      <ProductFilterList list={meta?.brands} urlKey="brands" label="Brands" />
      <ProductFilterList
        list={conditions}
        urlKey="conditions"
        label="Conditions"
      />
    </div>
  );
};

export default ProductFilters;
