import { useParams, Link } from 'react-router-dom'
import { useCoursesContext } from 'course-platform/CoursesContext'
import { Heading } from 'course-platform/Heading'
import { DataGrid, Row, Col } from 'course-platform/DataGrid'
import { Loading } from 'course-platform/Loading'
import { NoResults } from 'course-platform/NoResults'
import { PreviousNextCourse } from 'course-platform/PreviousNextCourse'

export function BrowseCourseLessons() {
  const courseSlug = useParams().courseSlug!

  // If the data were coming from context
  const { getCourse, isLoading } = useCoursesContext()
  const course = getCourse(courseSlug)
  const lessons = course?.lessons || []

  if (!isLoading && !course) {
    return <div className="card">Not Found</div>
  }

  return (
    <>
      <div className="flex flex-gap">
        <div className="spacing flex-1">
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
            {!isLoading && Array.isArray(lessons) && lessons.length === 0 && (
              <NoResults>
                <div className="spacing">
                  <p>No Lessons for this Course</p>
                </div>
              </NoResults>
            )}
            {!isLoading && Array.isArray(lessons) && lessons.length > 0 && (
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
                    </Row>
                  )
                })}
              </DataGrid>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
