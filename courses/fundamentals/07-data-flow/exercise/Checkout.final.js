import React, { useReducer } from 'react'
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory
} from 'react-router-dom'
import Centered from 'YesterTech/Centered'

// Route Targets
import ViewCart from 'YesterTech/ViewCart'
import CheckoutBilling from './CheckoutBilling.final'
import CheckoutReview from 'YesterTech/CheckoutReview'

function Checkout() {
  const match = useRouteMatch()
  const history = useHistory()

  const [state, dispatch] = useReducer(
    (state, action) => {
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
      fields: {}
    }
  )

  function handleBillingSubmit(sameAsBilling, fields) {
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
            <CheckoutReview
              sameAsBilling={state.sameAsBilling}
              fields={state.fields}
            />
          </Route>
        )}
        <Redirect to={`${match.path}/cart`} />
      </Switch>
    </Centered>
  )
}

export default Checkout
