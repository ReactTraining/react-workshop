import { useState, useEffect } from "react";
import { get } from "YesterTech/api/utils";
import queryString from "query-string";
import { Product } from "YesterTech/types";

function getProducts(): Promise<Product[]> {
  const query = queryString.stringify({
    _limit: 3,
  });
  return get(`/products?${query}`);
}

export function useProducts(): Product[] | null {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    let isCurrent = true;
    getProducts().then((products) => {
      if (!isCurrent) return;
      setProducts(products);
    });
    return () => {
      isCurrent = false;
    };
  }, []);

  return products;
}
