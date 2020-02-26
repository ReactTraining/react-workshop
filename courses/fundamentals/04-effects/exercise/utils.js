import { get } from 'YesterTech/api/utils'

export function getCategories() {
  return get('/products')
    .then(products => {
      return products.reduce(
        (categories, product) =>
          categories.concat([product.category || '']),
        []
      )
    })
    .then(categories => {
      return [...new Set(categories)]
    })
}
