import * as React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Test Component
import { TaskCard } from './TaskCard'

// Mock modules
import { useBoardContext } from 'ProjectPlanner/BoardContext'

/**
 * Mocks
 */

jest.mock('ProjectPlanner/BoardContext')

/**
 * Tests
 */

describe('TaskCard', () => {
  it("should render with no content if async context hasn't resolved", async () => {
    useBoardContext.mockReturnValue({
      getTask: () => null,
    })
    render(<TaskCard />)
    // Produces error if not found
    screen.getByText('No Content')
  })
  it('should render the task info if async context has resolved', async () => {
    useBoardContext.mockReturnValue({
      getTask: () => {
        return { taskId: 1, name: 'fakeTaskName', content: 'fakeTaskContent' }
      },
    })
    render(<TaskCard />)
    const taskName = screen.getByText('fakeTaskName')
    expect(taskName).toBeTruthy()
    // Produces error if not found
    const taskContent = screen.getByText('fakeTaskContent')
  })
})
