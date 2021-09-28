import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Test Component
import { Board } from './Board'

// Mock modules
import { useBoardContext } from './BoardContext'

/**
 * Mocks
 */

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    boardId: 5, // doesn't matter
  }),
}))

jest.mock('ProjectPlanner/TaskGroup', () => ({
  TaskGroup: () => <div data-testid="mockTaskGroup" />,
}))

jest.mock('./BoardContext', () => ({
  __esModule: true,
  BoardProvider: ({ children }) => children,
  // mock values setup in tests:
  useBoardContext: jest.fn(),
}))

/**
 * Tests
 */

describe('Board', () => {
  it('should render the board with no tasks', () => {
    useBoardContext.mockReturnValue({
      board: null,
      taskGroups: [],
    })
    render(<Board />)
    screen.getByTestId('results')
  })
  it('should render the board with tasks', () => {
    useBoardContext.mockReturnValue({
      board: { name: 'fakeBoardName' },
      taskGroups: [{ id: 1 }], // minimal taskGroup data
    })
    render(<Board />)
    screen.getByText('fakeBoardName')
  })
})
