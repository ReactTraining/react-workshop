import React, { useState } from 'react'
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import Centered from 'YesterTech/Centered'

// Route Targets
import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from 'YesterTech/CheckoutBilling'
import CheckoutReview from 'YesterTech/CheckoutReview'

function Checkout() {
  const match = useRouteMatch()
  const history = useHistory()
  const [billingFields, setBillingFields] = useState({})

  function handleBillingSubmit(billingFields) {
    setBillingFields(billingFields)
    history.push(`${match.path}/review`)
  }

  return (
    <Centered>
      <Switch>
        <Route path={`${match.path}/cart`} exact>
          <ViewCart />
        </Route>
        <Route path={`${match.path}/billing`}>
          <CheckoutBilling onSubmit={handleBillingSubmit} defaultValues={billingFields} />
        </Route>
        <Route path={`${match.path}/review`}>
          <CheckoutReview billingFields={billingFields} />
        </Route>
        <Redirect to={`${match.path}/cart`} />
      </Switch>
    </Centered>
  )
}

export default Checkout
