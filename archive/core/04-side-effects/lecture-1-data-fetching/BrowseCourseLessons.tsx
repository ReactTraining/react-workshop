import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from 'react/_full-app/utils/api'
import { Heading } from 'react2/_full-app/src/Heading'
import { DataGrid, Row, Col } from '~/DataGrid'
import { CreateLessonDialog } from '~/CreateLessonDialog'
import { Loading } from '~/Loading'
import { NoResults } from '~/NoResults'
import { PreviousNextCourse } from '~/PreviousNextCourse'
import type { CourseWithLessons } from 'react/_full-app/utils/types'

// Setting state on unmounted components
// https://github.com/facebook/react/pull/22114

export function BrowseCourseLessons() {
  const courseSlug = useParams().courseSlug!
  const [createLessonDialog, setCreateLessonDialog] = useState(false)

  // Course and Lesson Data
  const [course, setCourse] = useState<CourseWithLessons | null>(null)
  const lessons = course && course.lessons
  const isLoading = course === null

  // Load Course and Lesson Data
  // api.courses.getCourse(courseSlug)

  function removeLesson(lessonId: number) {
    // if (!lessons) return
    // api.courses.removeLesson(lessonId).then(() => {
    //   const i = lessons.findIndex((l) => l.id === lessonId)
    //   setCourse({
    //     ...course,
    //     lessons: [...lessons.slice(0, i), ...lessons.slice(i + 1, lessons.length)],
    //   })
    // })
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
            /* lets figure out how to update the list
               1. We could mutate the array
               2. We could refetch
            */
          }}
        />
      )}
    </>
  )
}
