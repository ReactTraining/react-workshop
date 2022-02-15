import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from 'course-platform/utils/api'
import { Heading } from 'course-platform/Heading'
import { DataGrid, Row, Col } from 'course-platform/DataGrid'
import { Loading } from 'course-platform/Loading'
import { NoResults } from 'course-platform/NoResults'
import { useCoursesContext } from './CoursesContext'
import type { CourseWithLessons } from 'course-platform/utils/types'

export function BrowseCourses() {
  // // Course Data
  // const { getCourses, isLoading, fetchCourses } = useCoursesContext()
  // const courses = getCourses()

  // Course Data
  const [courses, setCourses] = useState<CourseWithLessons[] | null>(null)
  const isLoading = courses === null

  useEffect(() => {
    let isCurrent = true
    api.courses.getAll().then((courses) => {
      if (!isCurrent) return
      setCourses(courses)
    })
    return () => {
      isCurrent = false
    }
  }, [])

  function removeCourse(courseId: number) {
    if (!courses) return
    api.courses.removeCourse(courseId).then(() => {
      // fetchCourses()
    })
  }

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
  )
}
