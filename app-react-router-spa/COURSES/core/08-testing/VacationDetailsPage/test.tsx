import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { vi } from 'vitest'

import { VacationDetailsPage } from './VacationDetailsPage'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

// SimilarVacations loads its own data. Replace that subtree so this file
// only covers VacationDetailsPage.
vi.mock('~/SimilarVacations', () => ({
  SimilarVacations: () => null,
}))

vi.mock('~/utils/api', () => ({
  api: { vacations: { getVacation: vi.fn() } },
}))

const getVacation = vi.mocked(api.vacations.getVacation)

// Put the page on a real route instead of mocking useParams.
function renderPage(vacationId = '1') {
  const router = createMemoryRouter(
    [{ path: '/vacations/:vacationId', element: <VacationDetailsPage /> }],
    { initialEntries: [`/vacations/${vacationId}`] },
  )

  return render(<RouterProvider router={router} />)
}

const vacation: Vacation = {
  id: 1,
  name: 'Costa Rica',
  price: 999,
  related: [],
}

describe('VacationDetailsPage', () => {
  beforeEach(() => {
    getVacation.mockReset()
  })

  it('shows a loading indicator until the vacation resolves', () => {
    getVacation.mockReturnValue(new Promise<Vacation>(() => {}))
    renderPage()
    expect(screen.getByRole('status')).toHaveTextContent(/loading/i)
  })

  it('shows the vacation when the request resolves', async () => {
    getVacation.mockResolvedValue(vacation)
    renderPage()

    expect(await screen.findByRole('heading', { name: vacation.name })).toBeInTheDocument()
    expect(getVacation).toHaveBeenCalledWith(1)
  })
})
