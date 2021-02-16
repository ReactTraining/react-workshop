import * as React from 'react'
import { Switch, Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import Centered from 'YesterTech/Centered'

// Route Targets
import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from 'YesterTech/CheckoutBilling'
import CheckoutReview from 'YesterTech/CheckoutReview'
import { CheckoutFields } from 'YesterTech/types'

function Checkout(): React.ReactElement {
  const match = useRouteMatch()
  const history = useHistory()

  const [state, dispatch] = React.useReducer(
    function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
      switch (action.type) {
        case 'SUBMIT_BILLING': {
          const { sameAsBilling, fields } = action
          return { ...state, sameAsBilling, fields }
        }
        default:
          return state
      }
    },
    {
      sameAsBilling: false,
      fields: {
        billingName: '',
        billingAddress: '',
        shippingName: '',
        shippingAddress: '',
      },
    }
  )

  function handleBillingSubmit(sameAsBilling: boolean, fields: CheckoutFields) {
    dispatch({ type: 'SUBMIT_BILLING', sameAsBilling, fields })
    history.push(`${match.path}/review`)
  }

  return (
    <Centered>
      <Switch>
        <Route path={`${match.path}/cart`} exact>
          <ViewCart />
        </Route>
        <Route path={`${match.path}/billing`}>
          <CheckoutBilling
            onSubmit={handleBillingSubmit}
            defaultSameAsBilling={state.sameAsBilling}
            defaultFields={state.fields}
          />
        </Route>
        {Object.keys(state.fields).length > 0 && (
          <Route path={`${match.path}/review`}>
            <CheckoutReview sameAsBilling={state.sameAsBilling} fields={state.fields} />
          </Route>
        )}
        <Redirect to={`${match.path}/cart`} />
      </Switch>
    </Centered>
  )
}

export default Checkout

type CheckoutAction = {
  type: 'SUBMIT_BILLING'
  sameAsBilling: boolean
  fields: CheckoutFields
}

type CheckoutState = {
  sameAsBilling: boolean
  fields: CheckoutFields
}
