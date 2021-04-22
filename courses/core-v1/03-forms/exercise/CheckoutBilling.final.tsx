import * as React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

interface CheckoutBillingProps {
  onSubmit(sameAsBilling: boolean, fields: TextFields): void
}

type TextFieldName = 'billingName' | 'billingAddress' | 'shippingName' | 'shippingAddress'
type TextFields = Record<TextFieldName, string>
interface State extends TextFields {
  sameAsBilling: boolean
}

const initialState: State = {
  sameAsBilling: false,
  billingName: '',
  billingAddress: '',
  shippingName: '',
  shippingAddress: '',
}

type Action =
  | { type: 'TOGGLE_SAME_AS_BILLING' }
  | { type: 'SET_TEXT_FIELD'; fieldName: TextFieldName; value: string }
  | { type: 'SUBMIT_FORM'; callback(sameAsBilling: boolean, fields: TextFields): void }

const CheckoutBilling: React.FC<CheckoutBillingProps> = ({ onSubmit }) => {
  let [state, dispatch] = React.useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'TOGGLE_SAME_AS_BILLING':
        return {
          ...state,
          sameAsBilling: !state.sameAsBilling,
        }
      case 'SET_TEXT_FIELD':
        return {
          ...state,
          [action.fieldName]: action.value,
        }
      case 'SUBMIT_FORM': {
        let { sameAsBilling, billingName, billingAddress, shippingName, shippingAddress } = state
        action.callback(sameAsBilling, {
          billingName,
          billingAddress,
          shippingName: sameAsBilling ? billingName : shippingName,
          shippingAddress: sameAsBilling ? billingAddress : shippingAddress,
        })
        return {
          ...state,
        }
      }

      default:
        return state
    }
  }, initialState)

  let { sameAsBilling, billingName, billingAddress, shippingName, shippingAddress } = state

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch({ type: 'SUBMIT_FORM', callback: onSubmit })
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Billing &amp; Shipping
      </Heading>
      <form onSubmit={handleSubmit} className="spacing">
        <Heading as="h2" size={3}>
          Billing Info
        </Heading>
        <hr />
        <div className="form-field">
          <label htmlFor="billing-name">Name</label>
          <input
            id="billing-name"
            type="text"
            required
            defaultValue={billingName}
            onChange={(event) =>
              dispatch({
                type: 'SET_TEXT_FIELD',
                fieldName: 'billingName',
                value: event.target.value,
              })
            }
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing-address">Address</label>
          <input
            id="billing-address"
            type="text"
            required
            defaultValue={billingAddress}
            onChange={(event) =>
              dispatch({
                type: 'SET_TEXT_FIELD',
                fieldName: 'billingAddress',
                value: event.target.value,
              })
            }
          />
        </div>

        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>

        <label>
          <input
            type="checkbox"
            defaultChecked={sameAsBilling}
            onChange={() => dispatch({ type: 'TOGGLE_SAME_AS_BILLING' })}
          />{' '}
          Same as Billing
        </label>

        <div className="form-field">
          <label htmlFor="shipping-name">Name</label>
          <input
            id="shipping-name"
            type="text"
            required
            value={sameAsBilling ? billingName : shippingName}
            onChange={(event) =>
              dispatch({
                type: 'SET_TEXT_FIELD',
                fieldName: 'shippingName',
                value: event.target.value,
              })
            }
            disabled={sameAsBilling}
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping-address">Address</label>
          <input
            id="shipping-address"
            type="text"
            required
            value={sameAsBilling ? billingAddress : shippingAddress}
            onChange={(event) =>
              dispatch({
                type: 'SET_TEXT_FIELD',
                fieldName: 'shippingAddress',
                value: event.target.value,
              })
            }
            disabled={sameAsBilling}
          />
        </div>

        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  )
}

export default CheckoutBilling
