import * as React from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import queryString from "query-string";

import Heading from "YesterTech/Heading";
import ProductFilterItem from "YesterTech/ProductFilterItem";
import { ReactFCNoChildren } from "YesterTech/types";

interface ProductFilterListProps {
  urlKey: string;
  list?: string[];
  label: string;
}

const ProductFilterList: ReactFCNoChildren<ProductFilterListProps> = ({
  urlKey,
  list,
  label,
}): React.ReactElement => {
  const location = useLocation();
  const history = useHistory();
  const search = queryString.parse(location.search) || null;
  const searchRes = search[urlKey];
  const selected = searchRes
    ? Array.isArray(searchRes)
      ? searchRes.reduce<string[]>((prev, cur) => {
          return [...new Set([...prev, ...cur.split(",")])];
        }, [])
      : searchRes.split(",")
    : [];

  function isSelected(item: any) {
    return selected && selected.includes(item);
  }

  function toggleItem(item: any) {
    // Remove or Add
    const newSelected = isSelected(item)
      ? selected.filter((c) => c !== item)
      : selected.concat([item]);
    const newSearch = {
      ...search,
      page: undefined,
      [urlKey]: newSelected.length ? newSelected.join(",") : undefined,
    };
    history.push(`${location.pathname}?${queryString.stringify(newSearch)}`);
  }

  function getClearLink() {
    const newSearch = { ...search, page: undefined, [urlKey]: undefined };
    return `${location.pathname}?${queryString.stringify(newSearch)}`;
  }

  return (
    <section className="spacing-small">
      <Heading size={3}>{label}</Heading>
      {Array.isArray(list) &&
        list.map((item) => {
          return (
            <ProductFilterItem
              key={item}
              item={item}
              onChange={toggleItem}
              selected={isSelected(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </ProductFilterItem>
          );
        })}
      {selected.length > 0 && (
        <div className="text-small">
          <Link to={getClearLink()}>Show all {label}</Link>
        </div>
      )}
    </section>
  );
};

export default ProductFilterList;
