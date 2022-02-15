import { api } from 'course-platform/utils/api'
import { Formik, Form } from 'formik'
import { Dialog } from 'course-platform/Dialog'
import { useStudent } from 'course-platform/hooks/students'
import { FieldSelect } from 'course-platform/FormFields'
import { Heading } from 'course-platform/Heading'
import { Notice } from 'course-platform/Notice'

import { useCoursesContext } from 'course-platform/CoursesContext'

const initialValues = {
  courseId: '',
}

type Props = {
  studentId: number
  onClose(): void
}

export function StudentCoursesDialog({ studentId, onClose }: Props) {
  // All Courses
  const { getCourses } = useCoursesContext()
  const courses = getCourses() || []
  let selectCourses: typeof courses = []

  // Student
  const { student, isLoading, refetch } = useStudent(studentId)
  const studentCourses = courses
    ?.filter((c) => {
      const studentHasCourse = student?.courses.includes(c.id)
      if (!studentHasCourse) {
        selectCourses.push(c)
      }
      return studentHasCourse
    })
    .map((c) => c.id)

  function removeCourse(courseId: number) {
    if (!student) return
    api.students
      .updateCourses(
        student.id,
        studentCourses.filter((id) => id !== courseId)
      )
      .then(() => {
        refetch()
      })
  }

  return (
    <Dialog onClose={onClose} aria-label="Create Lesson Dialog">
      <div className="spacing">
        <Heading size={2}>Enroll in Courses</Heading>
        {selectCourses.length === 0 && <Notice>Student is enrolled in all courses</Notice>}
        {student && selectCourses.length > 0 && (
          <Formik
            onSubmit={(values, { resetForm }) => {
              const newCourseId = parseInt(values.courseId)
              return api.students
                .updateCourses(student.id, studentCourses.concat(newCourseId))
                .then(() => {
                  refetch() // Get the student record again
                  resetForm()
                })
            }}
            initialValues={initialValues}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ isValid }) => (
              <Form className="spacing maxw-180" noValidate>
                {!isValid && <Notice type="error">Please Fix Errors</Notice>}

                <div className="flex flex-gap items-bottom">
                  <div className="flex-1">
                    <FieldSelect label="Enroll by selecting a course" name="courseId" required>
                      <option value="">- Select Course -</option>
                      {selectCourses.map((course) => {
                        return (
                          <option key={course.id} value={course.id}>
                            {course.name}
                          </option>
                        )
                      })}
                    </FieldSelect>
                  </div>
                  <div>
                    <button type="submit" className="button">
                      Add
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}

        <Heading size={2} as="h2">
          Courses
        </Heading>
        <div className="spacing-small">
          {studentCourses.length === 0 && <div>No Enrollments</div>}
          {studentCourses.length > 0 &&
            studentCourses.map((courseId) => {
              const course = courses.find((c) => c.id == courseId)!
              return (
                <>
                  <hr />
                  <div className="flex-split p-2">
                    <div className="">
                      <b>{course.name}</b>
                    </div>
                    <div>
                      <button className="button" onClick={() => removeCourse(course.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </>
              )
            })}
        </div>
      </div>
    </Dialog>
  )
}
