import { render, screen, waitFor } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import '@testing-library/jest-dom/extend-expect'

// Test Component
import { VacationDetailsPage } from './VacationDetailsPage'

// Mock modules
import { api } from '~/utils/api'

/**
 * Mocks
 */

jest.mock('react-router', () => ({
  // use actual library code for all non-hook parts
  ...jest.requireActual('react-router'),
  Link: ({ children }: PropsWithChildren) => <a href="/">{children}</a>,
  useParams: () => ({
    // arbitrary value to mock the URL
    vacationId: '1',
  }),
}))

// If we want to completely eliminate a sub-tree of components
jest.mock('~/SimilarVacations', () => ({
  SimilarVacations: () => null,
}))

// If we want a wrapper to no do anything but be an empty shell
jest.mock('~/Card', () => ({
  Card: (props: PropsWithChildren) => props.children,
}))

// If we want to mock something like our promise-based data-fetches
// but we don't know how yet so we'll do more specifics in the actual
// tests below
jest.mock('~/utils/api', () => ({
  // mock values setup in tests:
  api: { vacations: { getVacation: jest.fn() } },
}))

/**
 * Tests
 */

describe('VacationDetailsPage', () => {
  it("should show loading indicator when data isn't resolved", () => {
    ;(api.vacations.getVacation as jest.Mock).mockResolvedValue(null)
    render(<VacationDetailsPage />)
    screen.getByText('Loading...')
  })
  it('should show some of the results when the data resolves', async () => {
    ;(api.vacations.getVacation as jest.Mock).mockResolvedValue({
      vacationId: 1,
      name: 'testName',
      related: [],
    })
    render(<VacationDetailsPage />)
    await waitFor(() => screen.getByText('testName'))
  })
})
