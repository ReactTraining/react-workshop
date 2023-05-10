import { Heading } from '~/components/Heading'
import { FilterLink, FilterLinkAll } from '~/components/FilterLink'
import type { BrandType, CategoryType } from '~/utils/db.server'
import { useLocation } from '@remix-run/react'

type Props = {
  brands: BrandType[]
  categories: CategoryType[]
}

export function ProductsSidebar({ brands, categories }: Props) {
  return (
    <>
      <FilterByBrand brands={brands} />
      <FilterByCategory categories={categories} />
      <FilterByPrice />
    </>
  )
}

/****************************************
  Filter By Brand
*****************************************/

type FilterByBrandProps = {
  brands: BrandType[]
}

function FilterByBrand({ brands }: FilterByBrandProps) {
  const pathname = useLocation().pathname

  return (
    <section className="space-y-1">
      <Heading as="h2" size={4}>
        Filter By Brand
      </Heading>
      <FilterLinkAll url={pathname} filter="brand">
        All Brands
      </FilterLinkAll>
      {brands.map((brand) => {
        return (
          <FilterLink key={brand.id} url={pathname} filter="brand" value={brand.handle}>
            {brand.label}
          </FilterLink>
        )
      })}
    </section>
  )
}

/****************************************
  Filter By Category
*****************************************/

type FilterByCategoryProps = {
  categories: CategoryType[]
}

function FilterByCategory({ categories }: FilterByCategoryProps) {
  const pathname = useLocation().pathname

  return (
    <section className="space-y-1">
      <Heading as="h2" size={4}>
        Filter By Type
      </Heading>
      <FilterLinkAll url={pathname} filter="category">
        All Types
      </FilterLinkAll>
      {categories.map((category) => {
        return (
          <FilterLink key={category.id} url={pathname} filter="category" value={category.handle}>
            {category.label}
          </FilterLink>
        )
      })}
    </section>
  )
}

/****************************************
  Filter By Price
*****************************************/

function FilterByPrice() {
  return (
    <section className="space-y-3">
      <div className="flex justify-between items-center">
        <Heading as="h2" size={4}>
          Max Price
        </Heading>
        <div className="text-brandColor">
          <b>$5000</b>
        </div>
      </div>
      <input type="range" className="block w-full" />
      <div className="flex justify-between items-center">
        <div className="text-sm">$10</div>
        <div className="text-sm">$5000</div>
      </div>
    </section>
  )
}
