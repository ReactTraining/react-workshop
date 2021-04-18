import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutBilling from '../CheckoutBilling'
import '@testing-library/jest-dom' // Note: including for now because could not get this to work: https://github.com/testing-library/jest-dom#with-typescript

// `npm run mytest`

const mockOnSubmit = jest.fn((...args: any) => {})

describe('<CheckoutBilling />', () => {
  it('renders with shipping info visible by default', async () => {
    render(<CheckoutBilling onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText(/shipping name/i)).toBeVisible()
    expect(screen.getByLabelText(/shipping address/i)).toBeVisible()
  })

  it('toggles visibility of shipping info when same as billing changes', async () => {
    render(<CheckoutBilling onSubmit={mockOnSubmit} />)

    const sameAsBillingCheckbox = await screen.findByLabelText(/same as billing/i)
    fireEvent.click(sameAsBillingCheckbox)

    expect(screen.queryByLabelText(/shipping name/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/shipping address/i)).not.toBeInTheDocument()

    fireEvent.click(sameAsBillingCheckbox)

    expect(screen.getByLabelText(/shipping name/i)).toBeVisible()
    expect(screen.getByLabelText(/shipping address/i)).toBeVisible()
  })

  it('submits form input to onSubmit handler', async () => {
    render(<CheckoutBilling onSubmit={mockOnSubmit} />)

    const billingName = screen.getByLabelText(/billing name/i)
    fireEvent.input(billingName, { target: { value: 'Test' } })

    const submitButton = await screen.findByRole('button')
    fireEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
    expect(mockOnSubmit).toHaveBeenCalledWith({
      billingName: 'Test',
    })
    ;(await screen.findAllByLabelText(/name/i)).forEach((input) => {
      fireEvent.input(input, { target: { value: 'John Doe' } })
    })
    ;(await screen.findAllByLabelText(/address/i)).forEach((input) => {
      // alternative to using fireEvent.input:
      userEvent.type(input, '123 Fake St.')
    })

    // alternative to using fireEvent.click(submitButton):
    userEvent.keyboard('{enter}')

    expect(mockOnSubmit).toHaveBeenCalledWith({
      billingName: 'John Doe',
      billingAddress: '123 Fake St.',
      shippingName: 'John Doe',
      shippingAddress: '123 Fake St.',
    })
  })
})
