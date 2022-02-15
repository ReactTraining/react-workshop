import { useState } from 'react'
import { api } from 'course-platform/utils/api'
import { useStudents } from 'course-platform/hooks/students'
import { Heading } from 'course-platform/Heading'
import { StudentCoursesDialog } from 'course-platform/StudentCoursesDialog'
import { AddStudentForm } from 'course-platform/AddStudentForm'
import { Loading } from 'course-platform/Loading'
import { NoResults } from 'course-platform/NoResults'
import { DataGrid, Row, Col } from 'course-platform/DataGrid'

export function BrowseStudents() {
  const { students, isLoading, refetch } = useStudents()
  const [showCoursesByStudentId, setShowCoursesByStudentId] = useState<number | null>(null)

  function removeStudent(studentId: number) {
    api.students.removeStudent(studentId).then(refetch)
  }

  return (
    <>
      <div className="flex flex-gap">
        <div className="card spacing flex-1">
          <Heading>Students</Heading>

          {isLoading && !students && <Loading />}
          {!isLoading && Array.isArray(students) && students.length === 0 && (
            <NoResults>
              <div className="spacing">
                <p>No Students</p>
              </div>
            </NoResults>
          )}
          {Array.isArray(students) && students.length > 0 && (
            <>
              <DataGrid>
                {students.map((student) => {
                  return (
                    <Row key={student.id}>
                      <Col width={300}>
                        {student.name}
                        {/* <Link to={`${student.id}`}>{student.name}</Link> */}
                      </Col>
                      <Col flex>
                        <div className="horizontal-spacing text-right">
                          <button
                            className="button button-outline"
                            onClick={() => {
                              setShowCoursesByStudentId(student.id)
                            }}
                          >
                            Courses Enrolled: {student.courses.length}
                          </button>
                          <button
                            className="button button-outline"
                            onClick={() => removeStudent(student.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </Col>
                    </Row>
                  )
                })}
              </DataGrid>
            </>
          )}
        </div>
        <aside className="card spacing w-120">
          <AddStudentForm onCreate={refetch} />
        </aside>
      </div>

      {showCoursesByStudentId && (
        <StudentCoursesDialog
          studentId={showCoursesByStudentId}
          onClose={() => {
            setShowCoursesByStudentId(null)
          }}
        />
      )}
    </>
  )
}
