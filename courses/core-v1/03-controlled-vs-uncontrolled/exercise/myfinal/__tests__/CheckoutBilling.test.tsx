import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutBilling from '../CheckoutBilling'
import '@testing-library/jest-dom/extend-expect' // Note: including for now because could not get this to work: https://github.com/testing-library/jest-dom#with-typescript

// `npm run mytest`

const mockOnSubmit = jest.fn((...args: any) => {})

describe('<CheckoutBilling />', () => {
  it('renders with shipping info visible by default', async () => {
    render(<CheckoutBilling onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/shipping name/i)).toBeVisible();
    expect(screen.getByLabelText(/shipping address/i)).toBeVisible();
  })

  it('toggles disabled state and values of shipping info when same as billing changes', async () => {
    render(<CheckoutBilling onSubmit={mockOnSubmit} />)

		const BILLING_NAME = 'John Doe'
    const billingName = screen.getByLabelText(/billing name/i)
    fireEvent.input(billingName, { target: { value: BILLING_NAME } })
		
    // alternative to using fireEvent.input:
		const BILLING_ADDRESS = '123 Fake St.'
    const billingAddress = screen.getByLabelText(/billing address/i)
    billingAddress.focus()
    userEvent.type(billingAddress, BILLING_ADDRESS)

    const sameAsBillingCheckbox = await screen.findByLabelText(/same as billing/i)
    fireEvent.click(sameAsBillingCheckbox)

    const shippingName = screen.getByLabelText(/shipping name/i)
    expect(shippingName).toBeDisabled()
    expect(shippingName).toHaveValue(BILLING_NAME)
    const shippingAddress = screen.getByLabelText(/shipping address/i)
    expect(shippingAddress).toBeDisabled()
    expect(shippingAddress).toHaveValue(BILLING_ADDRESS)

    fireEvent.click(sameAsBillingCheckbox)

    expect(shippingName).toBeEnabled()
    expect(shippingName).toHaveValue("");
    expect(shippingAddress).toBeEnabled()
    expect(shippingAddress).toHaveValue("");
  })

  it('submits form input to onSubmit handler', async () => {
    render(<CheckoutBilling onSubmit={mockOnSubmit} />)

    const billingName = screen.getByLabelText(/billing name/i)
    fireEvent.input(billingName, { target: { value: 'Test' } })

    const submitButton = await screen.findByRole('button')
    fireEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith(false, {
      billingAddress: '',
      billingName: 'Test',
      shippingAddress: '',
      shippingName: '',
    })

		// Check that it does not use same info as billing when unchecked
		const BILLING_NAME = 'John Doe'
		fireEvent.input(screen.getByLabelText(/billing name/i), { target: { value: BILLING_NAME }});
		const SHIPPING_NAME = 'Jane Doe'
		fireEvent.input(screen.getByLabelText(/shipping name/i), { target: { value: SHIPPING_NAME }});

		// alternative to using fireEvent.input:
		const BILLING_ADDRESS = '123 Fake St.'
		userEvent.type(screen.getByLabelText(/billing address/i), BILLING_ADDRESS);
		const SHIPPING_ADDRESS = '456 Mock Rd.'
		userEvent.type(screen.getByLabelText(/shipping address/i), SHIPPING_ADDRESS);
		
    // alternative to using fireEvent.click(submitButton):
    userEvent.keyboard('{enter}')

    expect(mockOnSubmit).toHaveBeenCalledWith(false, {
      billingAddress: BILLING_ADDRESS,
      billingName: BILLING_NAME,
      shippingAddress: SHIPPING_ADDRESS,
      shippingName: SHIPPING_NAME,
    })
		
		// Check that it uses same info as billing when checked
    const sameAsBillingCheckbox = await screen.findByLabelText(/same as billing/i)
    fireEvent.click(sameAsBillingCheckbox)
    fireEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith(true, {
      billingAddress: BILLING_ADDRESS,
      billingName: BILLING_NAME,
      shippingAddress: BILLING_ADDRESS,
      shippingName: BILLING_NAME,
    })

		// Check that it goes back to not using same info as billing when unchecked
    fireEvent.click(sameAsBillingCheckbox)
    fireEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith(false, {
      billingAddress: BILLING_ADDRESS,
      billingName: BILLING_NAME,
      shippingAddress: SHIPPING_ADDRESS,
      shippingName: SHIPPING_NAME,
    })
  })
})
