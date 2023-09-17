import { Link } from 'react-router-dom'
import { api } from 'react/_full-app/utils/api'
import { useCoursesContext } from '~/CoursesContext'
import { Heading } from 'react2/_full-app/src/Heading'
import { Loading } from '~/Loading'
import { NoResults } from '~/NoResults'
import { DataGrid, Row, Col } from '~/DataGrid'
import { RecentLessons } from '~/RecentLessons'
import { AppSidebar } from '~/AppSidebar'

export function BrowseCourses() {
  const { getCourses, isLoading, fetchCourses } = useCoursesContext()
  const courses = getCourses()

  function removeCourse(courseId: number) {
    api.courses.removeCourse(courseId).then(() => {
      fetchCourses()
    })
  }

  return (
    <div className="flex flex-gap">
      <div className="card flex-1 spacing">
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
                      <Link to={`${course.slug}`} className="text-large">
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
      <AppSidebar>
        <RecentLessons />
      </AppSidebar>
    </div>
  )
}
