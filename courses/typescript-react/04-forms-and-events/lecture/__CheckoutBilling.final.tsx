import * as React from 'react'
import { MdShoppingCart } from 'react-icons/md'
import Heading from 'YesterTech/Heading'

const initialState: State = {
  sameAsBilling: false,
  billingName: '',
  billingAddress: '',
  shippingName: '',
  shippingAddress: '',
}

const CheckoutBilling: React.FC<CheckoutBillingProps> = ({ onSubmit }) => {
  let [state, dispatch] = React.useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'RESET_FORM':
        return initialState
      case 'SET_SAME_AS_BILLING':
        return {
          ...state,
          sameAsBilling: action.checked,
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

  function handleResetClick(event: React.MouseEvent<HTMLButtonElement>) {
    dispatch({ type: 'RESET_FORM' })
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'SET_SAME_AS_BILLING',
      checked: event.target.checked,
    })
  }

  function getFieldChangeHandler(
    fieldName: 'billingName' | 'billingAddress' | 'shippingName' | 'shippingAddress'
  ) {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      dispatch({
        type: 'SET_TEXT_FIELD',
        fieldName,
        value: event.target.value,
      })
    }
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
            value={billingName}
            onChange={getFieldChangeHandler('billingName')}
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing-address">Address</label>
          <input
            id="billing-address"
            type="text"
            required
            value={billingAddress}
            onChange={getFieldChangeHandler('billingAddress')}
          />
        </div>
        <Heading as="h2" size={3}>
          Shipping Info
        </Heading>
        <label>
          <input type="checkbox" checked={sameAsBilling} onChange={handleCheckboxChange} /> Same as
          Billing
        </label>
        <div className="form-field">
          <label htmlFor="shipping-name">Name</label>
          <input
            id="shipping-name"
            type="text"
            required
            value={sameAsBilling ? billingName : shippingName}
            onChange={getFieldChangeHandler('shippingName')}
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
            onChange={getFieldChangeHandler('shippingAddress')}
            disabled={sameAsBilling}
          />
        </div>
        <button type="submit" className="button cta-button">
          Submit
        </button>{' '}
        <button type="button" className="button secondary" onClick={handleResetClick}>
          Reset
        </button>
      </form>
    </div>
  )
}

export default CheckoutBilling

interface CheckoutBillingProps {
  onSubmit(sameAsBilling: boolean, fields: TextFields): void
}

type TextFieldName = 'billingName' | 'billingAddress' | 'shippingName' | 'shippingAddress'
type TextFields = Record<TextFieldName, string>
interface State extends TextFields {
  sameAsBilling: boolean
}

type Action =
  | { type: 'RESET_FORM' }
  | { type: 'SET_SAME_AS_BILLING'; checked: boolean }
  | { type: 'SET_TEXT_FIELD'; fieldName: TextFieldName; value: string }
  | { type: 'SUBMIT_FORM'; callback(sameAsBilling: boolean, fields: TextFields): void }
