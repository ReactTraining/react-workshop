import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Mock modules
import api from 'YesterTech/api'
import { useShoppingCart } from 'YesterTech/ShoppingCartState'
import ProductProfile from 'YesterTech/ProductProfile'

/**
 * Mocks
 */

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    productId: 5 // arbitrary
  })
}))

jest.mock('YesterTech/ShoppingCartState')
jest.mock('YesterTech/api')

useShoppingCart.mockReturnValue({
  addToCart: () => null,
  updateQuantity: () => null,
  getQuantity: () => null
})

const mockProductResponse = {
  name: 'TestProduct',
  price: 10
}

api.products.getProduct.mockResolvedValue(mockProductResponse)

/**
 * Tests
 */

describe('ProductProfile', () => {
  it('should render the product', async () => {
    render(<ProductProfile />)

    expect(api.products.getProduct).toHaveBeenCalledWith(5)
    expect(api.products.getProduct).toHaveBeenCalledTimes(1)

    const loading = screen.getByText('Loading...')
    expect(loading).toBeTruthy()

    // "Waits" for component's side effects to resolve
    const name = await screen.findByText(mockProductResponse.name)
    expect(name).toBeTruthy()

    // This is not as thorough as it could be regarding number of tests, but
    // gives the basic idea of testing with mocks and async network requests
  })
})
