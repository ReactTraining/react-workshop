# Notes for Instructor

## Teach "lifting state"

```js
//                                                      ▼ State is currently here
PrimaryLayout -> BrowseProducts -> BrowseProductItem -> Quantity
//                                 ▲ Lift state to here
//
PrimaryLayout -> BrowseProducts -> BrowseProductItem -> Quantity
// ▲ Eventually lift state here
// ▲ And then at the end we can convert to context
```

Start with the `Quantity` component which should resemble where it was left off in the lecture for 03-controlled-vs-uncontrolled. Then show it's parent `BrowseProductItem` which doesn't work when the button is clicked. We'll need to lift state in order to get the two working the way we need them to.

1. Lift the `quantity` state up to `BrowseProductItem`.
2. When the user clicks "Add to Cart", set the quantity to `1`.
3. Only show `<Quantity />` if `quantity > 0`.
4. Pass down `quantity` and an `onChange` function to <Quantity /> so that it can update its parent's quantity.
5. This can open up a conversation about how "controlled vs uncontrolled" can apply to our custom components as well.

Here's what `BrowseProductItem` could look like after the refactor

```js
function BrowseProductItem({ name, imagePath }) {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="browse-product-item">
      <ProductImage src={imagePath} size={7} alt={name} />
      <div>{name}</div>
      <div className="spacing-small">
        <button
          className={'button' + (quantity > 0 ? ' cta-button' : '')}
          onClick={() => (quantity === 0 ? setQuantity(1) : null)}
        >
          {quantity === 0 ? (
            'Add To Cart'
          ) : (
            <Fragment>
              <MdShoppingCart /> Checkout
            </Fragment>
          )}
        </button>
        <div className="align-right">
          {quantity > 0 && (
            <Quantity
              quantity={quantity}
              onChange={quantity => {
                setQuantity(quantity)
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
```

## Lift State Again

Now we need know the number of items in the cart one level up in `BrowseProducts` so we an code the "View Cart (3)" section.

This state lift is a little unique because we need to aggregate all the cart items into an array. This comes with some extra work to manage the array. So if you look in `BrowseProducts` you'll see some utility functions already made for this.

## Lift State Yet Again

Now we need to lift the `cart` array and it's utility functions up one level to `PrimaryLayout` so we can hide the "Checkout" link in the `primary-header` and also so we can make the route to `/checkout` conditioned on whether we have items in the cart.

`PrimaryLayout` might end up looking something like this:

```jsx
function PrimaryLayout() {
  const [cart, setCart] = useState([])

  function addToCart(productId, name, price) {
    const newCart = cart.concat([
      { productId, quantity: 1, name, price }
    ])
    setCart(newCart)
  }

  function updateQuantity(productId, quantity) {
    let newCart
    if (quantity > 0) {
      newCart = cart.map(product => {
        return product.productId === productId
          ? { ...product, quantity }
          : product
      })
    } else {
      newCart = cart.filter(
        product => product.productId !== productId
      )
    }
    setCart(newCart)
  }

  function getQuantity(productId) {
    if (!Array.isArray(cart)) return 0
    return (
      (cart.find(p => p.productId === productId) || {}).quantity || 0
    )
  }

  return (
    <div className="primary-layout">
      <div>
        <header className="primary-header">
          <NavLink to="/products">Products</NavLink>
          {cart.length > 0 && (
            <NavLink to="/checkout">Checkout</NavLink>
          )}
        </header>
        <main className="primary-content">
          <Switch>
            <Route path="/products">
              <BrowseProducts
                addToCart={addToCart}
                updateQuantity={updateQuantity}
                getQuantity={getQuantity}
              />
            </Route>
            {cart.length > 0 && (
              <Route path="/checkout">
                <Checkout />
              </Route>
            )}
            <Redirect to="/products" />
          </Switch>
        </main>
      </div>
    </div>
  )
}
```

## Teach Context

Have a conversation with the students about how this state could be lifted all the way to `App`. If you want to and have time, you can even setup context directly in `App` to start the conversation about context.

But before you get too far, you might want to start a conversation about organizing each type of context into it's own custom Provider. We've already started to create that for you at `ShoppingCartState.js`.

Move the `cart` and utility functions into that file and re-wire the app to use the context provider and `useShoppingCart` instead of passing props all over.
