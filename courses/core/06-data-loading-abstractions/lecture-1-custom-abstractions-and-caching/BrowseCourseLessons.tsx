import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from 'course-platform/utils/api'
import { Heading } from 'course-platform/Heading'
import { DataGrid, Row, Col } from 'course-platform/DataGrid'
import { CreateLessonDialog } from 'course-platform/CreateLessonDialog'
import { Loading } from 'course-platform/Loading'
import { NoResults } from 'course-platform/NoResults'
import { PreviousNextCourse } from 'course-platform/PreviousNextCourse'
import { useCoursesContext } from './CoursesContext'
import type { CourseWithLessons } from 'course-platform/utils/types'

export function BrowseCourseLessons() {
  const courseSlug = useParams().courseSlug!
  const [createLessonDialog, setCreateLessonDialog] = useState(false)

  // // Course and Lesson Data
  // const { getCourse, isLoading, fetchCourses } = useCoursesContext()
  // const course = getCourse(courseSlug)
  // const lessons = course?.lessons

  // Course and Lesson Data
  const [course, setCourse] = useState<CourseWithLessons | null>(null)
  const lessons = course?.lessons
  const isLoading = course === null

  useEffect(() => {
    let isCurrent = true
    api.courses.getCourse(courseSlug).then((course) => {
      if (!isCurrent) return
      setCourse(course)
    })
    return () => {
      isCurrent = false
    }
  }, [courseSlug])

  function removeLesson(lessonId: number) {
    if (!lessons) return
    api.courses.removeLesson(lessonId).then(() => {
      // fetchCourses()
    })
  }

  if (!isLoading && !course) {
    return <div className="card">Not Found</div>
  }

  return (
    <>
      <div className="spacing">
        <div className="card flex-split">
          <Heading>
            Course: <span className="text-blue">{course?.name}</span>
          </Heading>
          <nav>
            <PreviousNextCourse courseId={course?.id} />
          </nav>
        </div>
        <div className="card spacing">
          <Heading size={2}>Lessons</Heading>

          {isLoading && <Loading />}
          {!isLoading && Array.isArray(lessons) && lessons.length === 0 ? (
            <NoResults>
              <div className="spacing">
                <p>No Lessons for this Course</p>
                <button className="button" onClick={() => setCreateLessonDialog(true)}>
                  Create Lessons
                </button>
              </div>
            </NoResults>
          ) : (
            <>
              <DataGrid>
                {lessons?.map((lesson) => {
                  return (
                    <Row key={lesson.id}>
                      <Col flex>
                        <Link to={lesson.slug} className="block text-large">
                          <b>{lesson.name}</b>
                        </Link>
                        <div>
                          {course?.slug}/{lesson.slug}
                        </div>
                      </Col>
                      <Col>
                        <button
                          className="button button-small button-outline"
                          onClick={() => removeLesson(lesson.id)}
                        >
                          Remove
                        </button>
                      </Col>
                    </Row>
                  )
                })}
              </DataGrid>
              <footer>
                <button className="button" onClick={() => setCreateLessonDialog(true)}>
                  Create Lessons
                </button>
              </footer>
            </>
          )}
        </div>
      </div>

      {createLessonDialog && course && (
        <CreateLessonDialog
          course={course}
          onClose={() => setCreateLessonDialog(false)}
          onCreate={(newLesson) => {
            /* lets figure out how to update the list */
          }}
        />
      )}
    </>
  )
}
