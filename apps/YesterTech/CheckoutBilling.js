import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Columns, Column } from 'react-flex-columns'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { MdShoppingCart } from 'react-icons/md'

import Heading from 'YesterTech/Heading'

function CheckoutBilling({ onSubmit, defaultSameAsBilling = false, defaultFields = {} }) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'TOGGLE_SAME_AS_BILLING':
          return { ...state, sameAsBilling: !state.sameAsBilling }
        case 'CHANGE_FIELD':
          return { ...state, [action.field]: action.value }
        default:
          return state
      }
    },
    {
      sameAsBilling: defaultSameAsBilling,
      // Form Fields
      billingName: defaultFields.billingName || '',
      billingAddress: defaultFields.billingAddress || '',
      billingCity: defaultFields.billingCity || '',
      billingState: defaultFields.billingState || '',
      billingPostal: defaultFields.billingPostal || '',
      shippingName: defaultFields.shippingName || '',
      shippingAddress: defaultFields.shippingAddress || '',
      shippingCity: defaultFields.shippingCity || '',
      shippingState: defaultFields.shippingState || '',
      shippingPostal: defaultFields.shippingPostal || ''
    }
  )

  const {
    sameAsBilling,
    billingName,
    billingAddress,
    billingCity,
    billingState,
    billingPostal,
    shippingName,
    shippingAddress,
    shippingCity,
    shippingState,
    shippingPostal
  } = state

  function handleSubmit(event) {
    event.preventDefault()
    const fields = {
      billingName,
      billingAddress,
      billingCity,
      billingState,
      billingPostal,
      shippingName: sameAsBilling ? billingName : shippingName,
      shippingAddress: sameAsBilling ? billingAddress : shippingAddress,
      shippingCity: sameAsBilling ? billingCity : shippingCity,
      shippingState: sameAsBilling ? billingState : shippingState,
      shippingPostal: sameAsBilling ? billingPostal : shippingPostal
    }
    onSubmit(sameAsBilling, fields)
  }

  function changeField(field, value) {
    dispatch({ type: 'CHANGE_FIELD', field, value })
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
          <label htmlFor="billing:name">Name</label>
          <input
            id="billing:name"
            type="text"
            required
            defaultValue={billingName}
            onChange={event => changeField('billingName', event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="billing:address">Address</label>
          <input
            id="billing:address"
            type="text"
            required
            defaultValue={billingAddress}
            onChange={event => changeField('billingAddress', event.target.value)}
          />
        </div>
        <Columns gutters>
          <Column>
            <div className="form-field">
              <label htmlFor="billing:city">City</label>
              <input
                id="billing:city"
                type="text"
                required
                defaultValue={billingCity}
                onChange={event => changeField('billingCity', event.target.value)}
              />
            </div>
          </Column>
          <Column>
            <div className="form-field">
              <label htmlFor="billing:state">State</label>
              <input
                id="billing:state"
                type="text"
                required
                defaultValue={billingState}
                onChange={event => changeField('billingState', event.target.value)}
              />
            </div>
          </Column>
          <Column>
            <div className="form-field">
              <label htmlFor="billing:postal">Postal Code</label>
              <input
                id="billing:postal"
                type="text"
                required
                defaultValue={billingPostal}
                onChange={event => changeField('billingPostal', event.target.value)}
              />
            </div>
          </Column>
        </Columns>

        <Columns split gutters middle>
          <Column className="spacing">
            <Heading as="h2" size={3}>
              Shipping Info
            </Heading>
          </Column>
          <Column>
            <label>
              <input
                type="checkbox"
                defaultChecked={sameAsBilling}
                onChange={() => dispatch({ type: 'TOGGLE_SAME_AS_BILLING' })}
              />{' '}
              Same as Billing
            </label>
          </Column>
        </Columns>

        <hr />
        <div className="form-field">
          <label htmlFor="shipping:name">Name</label>
          <input
            id="shipping:name"
            type="text"
            required
            value={sameAsBilling ? billingName : shippingName}
            onChange={event => changeField('shippingName', event.target.value)}
            disabled={sameAsBilling}
          />
        </div>
        <div className="form-field">
          <label htmlFor="shipping:address">Address</label>
          <input
            id="shipping:address"
            type="text"
            required
            value={sameAsBilling ? billingAddress : shippingAddress}
            onChange={event => changeField('shippingAddress', event.target.value)}
            disabled={sameAsBilling}
          />
        </div>
        <Columns gutters>
          <Column>
            <div className="form-field">
              <label htmlFor="shipping:city">City</label>
              <input
                id="shipping:city"
                type="text"
                required
                value={sameAsBilling ? billingCity : shippingCity}
                onChange={event => changeField('shippingCity', event.target.value)}
                disabled={sameAsBilling}
              />
            </div>
          </Column>
          <Column>
            <div className="form-field">
              <label htmlFor="shipping:state">State</label>
              <input
                id="shipping:state"
                type="text"
                required
                value={sameAsBilling ? billingState : shippingState}
                onChange={event => changeField('shippingState', event.target.value)}
                disabled={sameAsBilling}
              />
            </div>
          </Column>
          <Column>
            <div className="form-field">
              <label htmlFor="shipping:postal">Postal Code</label>
              <input
                id="shipping:postal"
                type="text"
                required
                value={sameAsBilling ? billingPostal : shippingPostal}
                onChange={event => changeField('shippingPostal', event.target.value)}
                disabled={sameAsBilling}
              />
            </div>
          </Column>
        </Columns>

        <hr />

        <Columns split>
          <Column>
            <Link className="button" to="/checkout/cart">
              <FaAngleLeft />
              <span>Cart</span>
            </Link>
          </Column>
          <Column>
            <button type="submit" className="button">
              <span>Review</span>
              <FaAngleRight />
            </button>
          </Column>
        </Columns>
      </form>
    </div>
  )
}

export default CheckoutBilling
