import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Test Component
import { BrowseCourseLessons } from './BrowseCourseLessons'

// Mock modules
import { useCoursesContext } from '~/CoursesContext'

/**
 * Mocks
 */

jest.mock('react-router-dom', () => ({
  // use actual library code for all non-hook parts
  ...jest.requireActual('react-router-dom'),
  Link: ({ children }) => <a href="/">{children}</a>,
  useParams: () => ({
    // arbitrary value to mock the URL
    courseSlug: 'react',
  }),
}))

jest.mock('~/PreviousNextCourse', () => ({
  PreviousNextCourse: () => null,
}))

jest.mock('~/CoursesContext', () => ({
  // mock values setup in tests:
  useCoursesContext: jest.fn(),
}))

/**
 * Tests
 */

describe('BrowseCourseLessons', () => {
  it('should render message for no course', () => {
    useCoursesContext.mockReturnValue({
      getCourse: () => null,
      isLoading: false,
    })
    render(<BrowseCourseLessons />)
    screen.getByText('Not Found')
  })
  it('Should render message for no lessons', () => {
    useCoursesContext.mockReturnValue({
      getCourse: () => ({ lessons: [] }),
      isLoading: false,
    })
    render(<BrowseCourseLessons />)
    screen.getByText('No Lessons for this Course')
  })
  it('Should render lessons', () => {
    useCoursesContext.mockReturnValue({
      getCourse: () => ({ lessons: [{ id: 1, slug: 'react', name: 'React' }] }),
      isLoading: false,
    })
    render(<BrowseCourseLessons />)
    screen.getByText('React')
  })
})
