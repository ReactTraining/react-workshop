import { Link } from 'react-router-dom'
import { api } from 'course-platform/utils/api'
import { useCoursesContext } from 'course-platform/CoursesContext'
import { Heading } from 'course-platform/Heading'
import { Loading } from 'course-platform/Loading'
import { NoResults } from 'course-platform/NoResults'
import { DataGrid, Row, Col } from 'course-platform/DataGrid'
import { RecentLessons } from 'course-platform/RecentLessons'
import { AppSidebar } from 'course-platform/AppSidebar'

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
