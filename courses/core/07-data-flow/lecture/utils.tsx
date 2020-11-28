import { useState, useEffect } from "react";
import { get } from "YesterTech/api/utils";
import queryString from "query-string";
import { Product } from "YesterTech/types";

function getProducts(limit: number = 3): Promise<Product[]> {
  const query = queryString.stringify({
    _limit: limit,
  });
  return get(`/products?${query}`);
}

export function useProducts(limit: number = 3): Product[] {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isCurrent = true;
    getProducts(limit).then((products) => {
      if (!isCurrent) return;
      setProducts(products);
    });
    return () => {
      isCurrent = false;
    };
  }, [limit]);

  return products;
}
