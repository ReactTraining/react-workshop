import { useState } from 'react'
import { api } from 'spa/utils/api'
import { useStudents } from 'spa/hooks/students'
import { Heading } from 'spa/Heading'
import { AddStudentForm } from 'spa/AddStudentForm'
import { Loading } from 'spa/Loading'
import { NoResults } from 'spa/NoResults'
import { DataGrid, Row, Col } from 'spa/DataGrid'

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
                        <button
                          className="button button-outline"
                          onClick={() => removeStudent(student.id)}
                        >
                          Remove
                        </button>
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
    </>
  )
}
