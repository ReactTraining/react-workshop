import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Test Component
import { BrowseCourseLessons } from './BrowseCourseLessons'

// Mock modules
import { useCoursesContext } from 'course-platform/CoursesContext'
import { api } from 'course-platform/utils/api'

/**
 * Mocks
 */

jest.mock('react-router-dom', () => ({
  // use actual library code for all non-hook parts
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    // arbitrary value to mock the URL
    courseSlug: 'react',
  }),
}))

// jest.mock('ProjectPlanner/TaskGroup', () => ({
//   TaskGroup: () => <div data-testid="mockTaskGroup" />,
// }))

jest.mock('course-platform/utils/api')

jest.mock('course-platform/CoursesContext', () => ({
  __esModule: true,
  // BoardProvider: ({ children }) => children,
  // mock values setup in tests:
  useCoursesContext: jest.fn(),
}))

/**
 * Tests
 */

describe('BrowseCourseLessons', () => {
  it('should ...', () => {
    useCoursesContext.mockReturnValue({
      getCourse: () => null,
      isLoading: false,
    })
    render(<BrowseCourseLessons />)
    // todo: finish
    // const input = screen.getByTestId('input')
    // expect(input.value).toEqual('0')
  })
})
