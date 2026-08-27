import { render, screen, waitFor } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { vi, type Mock } from 'vitest'

// Test Component
import { VacationDetailsPage } from './VacationDetailsPage'

// Mock modules
import { api } from '~/utils/api'

/**
 * Mocks
 */

vi.mock('react-router', async () => ({
  // use actual library code for all non-hook parts
  ...(await vi.importActual('react-router')),
  Link: ({ children }: PropsWithChildren) => <a href="/">{children}</a>,
  useParams: () => ({
    // arbitrary value to mock the URL
    vacationId: '1',
  }),
}))

// If we want to completely eliminate a sub-tree of components
vi.mock('~/SimilarVacations', () => ({
  SimilarVacations: () => null,
}))

// If we want a wrapper to no do anything but be an empty shell
vi.mock('~/Card', () => ({
  Card: ({ children }) => children,
}))

// If we want to mock something like our promise-based data-fetches
// but we don't know how yet so we'll do more specifics in the actual
// tests below
vi.mock('~/utils/api', () => ({
  // mock values setup in tests:
  api: { vacations: { getVacation: vi.fn() } },
}))

/**
 * Tests
 */

describe('VacationDetailsPage', () => {
  it("should show loading indicator when data isn't resolved", () => {
    ;(api.vacations.getVacation as Mock).mockResolvedValue(null)
    render(<VacationDetailsPage />)
    screen.getByText('Loading...')
  })
  it('should show some of the results when the data resolves', async () => {
    ;(api.vacations.getVacation as Mock).mockResolvedValue({
      vacationId: 1,
      name: 'testName',
      related: [],
    })
    render(<VacationDetailsPage />)
    await waitFor(() => screen.getByText('testName'))
  })
})
