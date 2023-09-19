import { Link } from 'react-router-dom'
import { Tiles } from '~/Tiles'
// import { CartButtons } from '~/components/CartButtons'

// import { useCart } from '~/state/CartContext'

// type BrowseProductsProps = {
//   products: ProductType[]
// }

export function BrowseVacations() {
  // const { cart } = useCart()
  const vacations = [
    {
      id: 1,
      name: 'name',
      price: 200,
    },
  ]

  return (
    <div>
      <Tiles>
        {vacations.map((vacation) => {
          return (
            <div key={vacation.id} className="rounded-lg bg-white shadow-sm">
              <BrowseVacationsItem vacation={vacation} />
            </div>
          )
        })}
      </Tiles>
    </div>
  )
}

type BrowseVacationsItemProps = {
  vacation: any // ProductType
}

export function BrowseVacationsItem({ vacation }: BrowseVacationsItemProps) {
  return (
    <div className="p-3 overflow-hidden flex flex-col">
      <img
        src={`/images/vacations${vacation.image}`}
        alt={vacation.name}
        className="block object-contain h-52"
      />
      <div className="space-y-3 mt-3 border-t">
        <div className="mt-3 flex justify-between items-center">
          <div className="">{vacation.name}</div>
          <b className="block">${vacation.price}</b>
        </div>
        <div className="flex gap-2">
          {/* <CartButtons productId={vacation.id} quantityInCart={quantityInCart} /> */}
          <div className="w-full flex flex-col">
            <Link to={`/products/${vacation.id}`} className="button">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
