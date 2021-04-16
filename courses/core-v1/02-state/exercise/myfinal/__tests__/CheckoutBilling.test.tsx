import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CheckoutBilling from '../CheckoutBilling'

const mockOnSubmit = jest.fn((...args:any) => {})

describe('<CheckoutBilling />', () => {
  it('renders with shipping info visible by default', async () => {
    render(<CheckoutBilling onSubmit={mockOnSubmit} />)

    expect((await screen.findAllByLabelText(/name/i)).length).toBe(2)
    expect((await screen.findAllByLabelText(/address/i)).length).toBe(2)
  })

  it('toggles visibility of shipping info when same as billing changes', async () => {
    render(<CheckoutBilling onSubmit={mockOnSubmit} />)

    const sameAsBillingCheckbox = await screen.findByLabelText(/same as billing/i)
    fireEvent.click(sameAsBillingCheckbox)

    expect((await screen.findAllByLabelText(/name/i)).length).toBe(1)
    expect((await screen.findAllByLabelText(/address/i)).length).toBe(1)

    fireEvent.click(sameAsBillingCheckbox)

    expect((await screen.findAllByLabelText(/name/i)).length).toBe(2)
    expect((await screen.findAllByLabelText(/address/i)).length).toBe(2)
  })

  it('submits form input to onSubmit handler', async () => {
    render(<CheckoutBilling onSubmit={mockOnSubmit} />)

	const billingName = (await screen.findAllByLabelText(/name/i))[0];
	fireEvent.input(billingName, { target: { value: "Test" } } );

	const submitButton = await screen.findByRole('button');
	fireEvent.click(submitButton);

	expect(mockOnSubmit).toHaveBeenCalledTimes(1);
	expect(mockOnSubmit).toHaveBeenCalledWith({
		"billingName": "Test",
	});

	(await screen.findAllByLabelText(/name/i)).forEach((input) => {
		fireEvent.input(input, { target: { value: "John Doe" } } );
	});
	(await screen.findAllByLabelText(/address/i)).forEach((input) => {
		// alternative to using fireEvent.input:
		userEvent.type(input, "123 Fake St.");
	});
	
	// alternative to using fireEvent.click(submitButton):
	userEvent.keyboard('{enter}');

	expect(mockOnSubmit).toHaveBeenCalledWith({
		"billingName": "John Doe",
		"billingAddress": "123 Fake St.",
		"shippingName": "John Doe",
		"shippingAddress": "123 Fake St.",
	});
  })
})
