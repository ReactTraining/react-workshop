import queryString from "query-string";
import { get, getRaw, post } from "./utils";
import { Product } from "YesterTech/types";

type ProductQuery = {
  categories?: string | undefined | null;
  brands?: string | undefined | null;
  conditions?: string | undefined | null;
};

export async function getProducts(search: ProductQuery = {}, page = 1) {
  // If setting up this search object seems a little weird, we're
  // just conforming to the funky API or JSON-Server
  const realSearch = {
    ...search,
    _limit: 10,
    _page: page,
    page: undefined,
    category: search.categories ? search.categories.split(",") : undefined,
    brand: search.brands ? search.brands.split(",") : undefined,
    condition: search.conditions ? search.conditions.split(",") : undefined,
  };

  const query = queryString.stringify(realSearch || {});

  const res = await getRaw(`/products?${query}`);
  const products = await res.json();
  return {
    products,
    totalResults: parseInt(res.headers.get("x-total-count")!, 10),
  };
}

export function getProduct(productId: Product["id"]) {
  return get(`/products/${productId}`);
}

export function addProduct(data: Product) {
  return post(`/products`, data);
}

export async function getMetaData(): Promise<{
  categories: Product["category"][];
  brands: Product["brand"][];
}> {
  const products: Product[] = await get("/products");
  const categories = products.reduce<Product["category"][]>(
    (c, p) => c.concat([p.category || ""]),
    []
  );
  const brands = products.reduce<Product["brand"][]>(
    (b, p_1) => b.concat([p_1.brand || ""]),
    []
  );
  return {
    categories: [...new Set(categories)],
    brands: [...new Set(brands)],
  };
}
