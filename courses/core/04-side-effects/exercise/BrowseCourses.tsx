import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from 'spa/utils/api'
import { Heading } from 'spa/Heading'
import { DataGrid, Row, Col } from 'spa/DataGrid'
import { Loading } from 'spa/Loading'
import { NoResults } from 'spa/NoResults'
// import { useCourses } from './courseData'
import type { CourseWithLessons } from 'spa/utils/types'

export function BrowseCourses() {
  const [courses, setCourses] = useState<CourseWithLessons[] | null>(null)
  const isLoading = courses === null

  // Write a useEffect to get all courses
  // HINT: The `PreviousNextCourse.tsx` component has the same one you'll write here

  // api.courses.getAll().then((courses) => {
  // })

  function removeCourse(courseId: number) {
    if (!courses) return
    api.courses.removeCourse(courseId).then(() => {
      const i = courses?.findIndex((c) => c.id === courseId)
      setCourses([...courses.slice(0, i), ...courses.slice(i + 1, courses.length)])
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
