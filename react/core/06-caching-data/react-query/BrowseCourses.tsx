import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { api } from 'spa/utils/api'
import { Heading } from 'spa/Heading'
import { DataGrid, Row, Col } from 'spa/DataGrid'
import { Loading } from 'spa/Loading'
import { NoResults } from 'spa/NoResults'
import { queryClient } from './queryClient'
import type { CourseWithLessons } from 'spa/utils/types'

export function BrowseCourses() {
  // 1. Previous Approach: Fetch in every component
  // const [courses] = useCourses()

  // 2. New Approach: Use React Query (useEffect and caching library)
  const {
    data: courses,
    isLoading,
    refetch,
  } = useQuery('courses', () => api.courses.getAll(), {
    staleTime: 1000 * 30,
  })

  // // 3. New Approach tucked under custom hook abstraction
  // const { courses, isLoading, refetch } = useCourses()
  // // const removeCourse = useRemoveCourse()

  // ✅ Remove course via API
  // ✅ Renew cache by refetching
  // ❌ Requires two serial network requests
  // ❌ over-fetches (why do we need to get all courses again)
  function removeCourse(courseId: number) {
    if (!courses) return
    api.courses.removeCourse(courseId).then(() => {
      refetch()
    })
  }

  // // ✅ Remove course via API
  // // ✅ Renew cache by selectively updating the array in the cache
  // // ❌ Tedious - Removing an item from an array should be abstracted
  // // ❌ Not Reusable - Should be a hook
  // // ❌ If we make our own hook, the rest of the app will not know we're mutating
  // function removeCourse(courseId: number) {
  //   if (!courses) return
  //   api.courses.removeCourse(courseId).then(() => {
  //     queryClient.setQueryData<CourseWithLessons[]>('courses', (courses) => {
  //       if (!courses) return []
  //       // They give us the old cache, we give them a new array.
  //       const i = courses.findIndex((c) => c.id === courseId)
  //       return [...courses.slice(0, i), ...courses.slice(i + 1)]
  //     })
  //   })
  // }

  // Use React Query Mutations Instead

  return (
    <div className="card spacing">
      <Heading>Courses</Heading>

      {isLoading && !courses && <Loading />}
      {!isLoading && Array.isArray(courses) && courses.length === 0 ? (
        <NoResults>
          <div className="spacing">
            <p>No Courses</p>
            <Link to="add" className="button">
              Add Course
            </Link>
          </div>
        </NoResults>
      ) : (
        <>
          <DataGrid>
            {courses?.map((course) => {
              return (
                <Row key={course.id}>
                  <Col flex>
                    <Link to={course.slug} className="text-large">
                      <b>{course.name}</b>
                    </Link>
                  </Col>
                  <Col width={150}>Lessons: {course.lessons.length}</Col>
                  <Col>
                    <button
                      className="button button-small button-outline"
                      onClick={() => removeCourse(course.id)}
                    >
                      Remove
                    </button>
                  </Col>
                </Row>
              )
            })}
          </DataGrid>
          <footer>
            <Link to="add" className="button">
              Add Course
            </Link>
          </footer>
        </>
      )}
    </div>
  )
}
