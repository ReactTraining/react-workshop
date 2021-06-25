import * as React from 'react'
import { Switch, Route, Redirect, useLocation, useHistory, Link, NavLink } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import queryString from 'query-string'
import api from 'YesterTech/api'
import Avatar from 'YesterTech/Avatar'
import Logo from 'YesterTech/Logo'
import SignupForm from 'YesterTech/SignupForm'
import LoginForm from 'YesterTech/LoginForm'
import usePromise from 'YesterTech/usePromise'
import NoResults from 'YesterTech/NoResults'
import ProductImage from 'YesterTech/ProductImage'
import Quantity from 'YesterTech/Quantity'
import StarRatings from 'YesterTech/StarRatings'
import ShoppingCartButton from 'YesterTech/ShoppingCartButton'
import { getInt } from 'YesterTech/utils'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { MdShoppingCart } from 'react-icons/md'
import { Menu, MenuList, MenuButton, MenuItem, MenuLink } from '@reach/menu-button'
import { useFavoriteProduct, useAuthState, useAuthDispatch, useShoppingCart } from './App.final'

import '@reach/menu-button/styles.css'
import 'YesterTech/PrimaryLayout.scss'
import 'YesterTech/PrimaryHeader.scss'

function PrimaryLayout() {
  const history = useHistory()
  const dispatch = useAuthDispatch()
  const { authenticated, user } = useAuthState()
  const { cart } = useShoppingCart()
  const { key } = useLocation()

  // Get the authenticated user
  React.useEffect(() => {
    let isCurrent = true
    if (!authenticated) {
      api.auth.getAuthenticatedUser().then((user) => {
        if (user && isCurrent) {
          dispatch({ type: 'LOGIN', user })
        }
      })
      return () => {
        isCurrent = false
      }
    }
  }, [authenticated, dispatch])

  // Scroll to the top of the page when pages change
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [key])

  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <main className="primary-content">
          <Switch>
            <Route path="/" exact>
              <h1>Home page</h1>
            </Route>
            <Route path="/signup" exact>
              <SignupForm
                onSignup={(user) => {
                  dispatch({ type: 'LOGIN', user })
                  history.push('/products')
                }}
              />
            </Route>
            <Route path="/login" exact>
              <LoginForm
                onAuthenticated={(user) => {
                  dispatch({ type: 'LOGIN', user })
                  history.push('/')
                }}
              />
            </Route>
            <Route path="/products">
              <BrowseProducts />
            </Route>
            {cart.length > 0 && (
              <Route path="/checkout">
                <h1>Checkout</h1>
              </Route>
            )}
            {authenticated && (
              <Route path="/account">
                <h1>{user ? `Welcome ${user.name || user.username}!` : 'My Account'}</h1>
              </Route>
            )}
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </div>
  )
}

function PrimaryHeader() {
  const dispatch = useAuthDispatch()
  const { authenticated, user } = useAuthState()
  const { getCartSize } = useShoppingCart()
  const cartSize = getCartSize()

  function handleLogout() {
    api.auth.logout().then(() => dispatch({ type: 'LOGOUT' }))
  }

  return (
    <div className="primary-header">
      <Columns gutters middle>
        <Column flex>
          <Link to="/" className="nav-logo">
            <Logo />
          </Link>
        </Column>
        <Column className="spacing-small vertical-middle">
          <nav className="horizontal-spacing-large align-right flex-parent flex-align-center">
            <NavLink to="/" exact className="primary-nav-item">
              Home
            </NavLink>
            <NavLink to="/products" className="primary-nav-item">
              Products
            </NavLink>
            {cartSize > 0 && (
              <NavLink to="/checkout" className="primary-nav-item nav-cart">
                <MdShoppingCart />
                <span className="label">{cartSize}</span>
              </NavLink>
            )}
            {authenticated ? (
              <Menu>
                <MenuButton className="primary-nav-item reset-button">
                  <Avatar src={user && user.avatarUrl} size={1.5} />
                </MenuButton>
                <MenuList className="nav-user-dropdown">
                  <MenuLink to="/account" as={Link}>
                    My Account
                  </MenuLink>
                  <MenuItem onSelect={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <NavLink to="/login" className="primary-nav-item">
                  Login
                </NavLink>
                <NavLink to="/signup" className="button">
                  Signup
                </NavLink>
              </>
            )}
          </nav>
        </Column>
      </Columns>
    </div>
  )
}

function BrowseProducts() {
  const urlQuery = useLocation().search
  const search = React.useMemo(() => queryString.parse(urlQuery), [urlQuery])
  const page = typeof search.page === 'string' ? getInt(search.page, 10) : 1

  // Get Products (Paginated) and Total
  const getProducts = React.useCallback(
    () => api.products.getProducts(search, page),
    [search, page]
  )
  const [response, loading] = usePromise(getProducts)
  const products = response?.products
  const totalResults = response?.totalResults

  return (
    <div className="browse-products spacing">
      <Columns middle>
        <Column className="spacing">
          <h1>Products</h1>
        </Column>
      </Columns>

      {Array.isArray(products) && products.length > 0 ? (
        <div className="spacing">
          {products.map((product) => (
            <BrowseProductItem
              key={product.id}
              productId={product.id}
              name={product.name}
              imagePath={product.imagePath}
              price={product.price}
              year={product.year}
              brand={product.brand}
              category={product.category}
              condition={product.condition}
              rating={product.rating}
            />
          ))}
        </div>
      ) : (
        <NoResults>No Results</NoResults>
      )}
    </div>
  )
}

export default PrimaryLayout

function BrowseProductItem({
  productId,
  name,
  price,
  imagePath,
  year = 'unknown',
  condition = 'n/a',
  brand = 'n/a',
  category = 'n/a',
  rating = 0,
}) {
  // Cart
  const { addToCart, updateQuantity, getQuantity } = useShoppingCart()
  const quantity = getQuantity(productId)

  return (
    <Columns gutters className="browse-product-item">
      <Column>
        <ProductImage src={imagePath} alt={name} />
      </Column>
      <Column flex className="spacing-small">
        <h2>
          <Link to={`/products/${productId}`}>
            {name} ({year})
          </Link>
        </h2>
        <StarRatings rating={rating} />
        <div className="horizontal-spacing">
          <span>Price:</span>
          <strong>${price.toFixed(2)}</strong>
        </div>
        <div className="text-small horizontal-spacing">
          <span>Brand: {brand}</span>
          <span>Category: {category}</span>
          <span>Condition: {condition}</span>
        </div>
      </Column>
      <Column className="spacing">
        <div className="spacing-small">
          <ShoppingCartButton
            onClick={() => addToCart(productId, name, price)}
            quantity={quantity}
          />
          {quantity > 0 && (
            <div className="align-right">
              <Quantity onChange={(q) => updateQuantity(productId, q)} quantity={quantity} />
            </div>
          )}
        </div>
        <div className="align-right">
          <SaveFavorite productId={productId} />
        </div>
      </Column>
    </Columns>
  )
}

function SaveFavorite({ productId }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoriteProduct()
  const favorite = isFavorite(productId)
  const action = favorite ? removeFavorite : addFavorite

  return (
    <button className="text-small as-link" onClick={() => action(productId)}>
      <span>Favorite</span>
      {favorite ? <HiHeart color="#f00" /> : <HiOutlineHeart />}
    </button>
  )
}
