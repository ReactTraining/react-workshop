import React from "react";
import { render, screen } from "@testing-library/react";
import Quantity from "../Quantity";


describe('<Quantity />', () => {
	it('renders with default value', async () => {
		render(<Quantity />);

		const quantityInput = screen.getByLabelText(/quantity/i) as HTMLInputElement;
		expect(quantityInput.value).toBe('1');
	})
});