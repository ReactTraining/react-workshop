import * as React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Heading from 'YesterTech/Heading'
import PrimaryNav from './utils/PrimaryNav'
import 'YesterTech/styles/global-styles.scss'

// Let's only load the code for reviews if we actually need it
import ProductReviews from './utils/ProductReviews'

// Then let's lazy load this via route change:
// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
import Account from './utils/Account'

export default function PrimaryLayout() {
  return (
    <BrowserRouter>
      <div className="spacing">
        <PrimaryNav />
        <hr />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/product">
            <ProductProfile />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

function HomePage() {
  return (
    <>
      <Heading>Home Page</Heading>
      <p>This page is loaded with the original bundle</p>
    </>
  )
}

function ProductProfile() {
  const [showReviews, setShowReviews] = React.useState(false)

  return (
    <>
      <Heading>Nintendo NES</Heading>
      <p>
        Checkout some of our{' '}
        <button className="as-link" onClick={() => setShowReviews(!showReviews)}>
          reviews
        </button>
        !
      </p>
      {showReviews && <ProductReviews />}
    </>
  )
}
