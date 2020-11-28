import * as React from "react";
import ProductFilterList from "YesterTech/ProductFilterList";
import { getCategories } from "./utils";

const ProductFilters: React.FC = function ProductFilters() {
  const [categories, setCategories] = React.useState<string[] | null>(null);

  React.useEffect(function fetchCategories() {
    let isCurrent = true;
    getCategories().then((categories) => {
      if (!isCurrent) return;
      setCategories(categories);
    });
    return () => {
      isCurrent = false;
    };
  }, []);

  if (!categories) return <div>Loading Filters...</div>;

  return (
    <div className="spacing">
      <ProductFilterList
        list={categories}
        urlKey="categories"
        label="Categories"
      />
    </div>
  );
};

export default ProductFilters;
