import * as React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import BrowseProducts from '../BrowseProducts'
import useProducts from '../useProducts'
import '@testing-library/jest-dom' // Note: including for now because could not get this to work: https://github.com/testing-library/jest-dom#with-typescript

// `npm run mytest`

// Mock useProducts hook so it will return mock data
jest.mock('../useProducts')
const useProductsMock = useProducts as jest.Mock

beforeAll(() => {
  // Make test output less noisy by mocking out console
  jest.spyOn(global.console, 'log').mockImplementation(() => {})
})

describe('<BrowseProducts>', () => {
  it('renders', () => {
    render(<BrowseProducts />)
  })

  // red test
  it('renders no products if no product data', async () => {
    useProductsMock.mockReturnValueOnce([])

    const { container } = render(<BrowseProducts />)

    expect(container.firstChild).toBe(null)
  })

  // green test
  it('renders products with header and rating', async () => {
    useProductsMock.mockReturnValueOnce([{ id: 2, name: 'Product', rating: 3.5 }])

    const { container } = render(<BrowseProducts />)

    expect(container.firstChild).not.toBe(null)

    await waitFor(() => screen.getByText(/Product/i))

    // Alternative to use of waitFor above:
    const test = await screen.findAllByText('Product')
    expect(test.length).toBeGreaterThan(0)

    // Rating of 3.5 should render as 3 full stars, 1 half star and 1 empty star
    // NOTE: Added "aria-label" attributes to the different types of star icons for accessibility but also for testing
    expect((await waitFor(() => screen.findAllByLabelText('full star rating'))).length).toBe(3)
    expect((await waitFor(() => screen.findAllByLabelText('half star rating'))).length).toBe(1)
    expect((await waitFor(() => screen.findAllByLabelText('empty star rating'))).length).toBe(1)
  })
})
