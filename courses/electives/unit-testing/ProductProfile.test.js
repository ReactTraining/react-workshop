import React from 'react'
import { render, cleanup, wait } from '@testing-library/react'
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
    productId: 1
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
  afterEach(cleanup)

  it('should render the product', async () => {
    const { getByText } = render(<ProductProfile />)

    expect(api.products.getProduct).toHaveBeenCalledWith(1)
    expect(api.products.getProduct).toHaveBeenCalledTimes(1)

    const loading = getByText('Loading...')
    expect(loading).toBeTruthy()

    await wait(() => {
      const name = getByText(mockProductResponse.name)
      expect(name).toBeTruthy()
    })

    // This is not as thorough as it could be, but gives the basic idea of testing
    // with mocks and async network requests
  })
})
