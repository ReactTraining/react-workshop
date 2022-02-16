import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { FieldInput } from 'course-platform/FormFields'
import { Heading } from 'course-platform/Heading'
import { Notice } from 'course-platform/Notice'
import { schemas } from 'course-platform/utils/validationSchemas'
import { useCreateCourse } from './useCourses'
import * as yup from 'yup'

const formSchema = yup.object().shape({
  name: schemas.courseName.required('Required'),
  slug: schemas.slug.required('Required'),
})

const initialValues = {
  name: '',
  slug: '',
}

export function AddCourseForm() {
  const navigate = useNavigate()
  const createCourse = useCreateCourse()

  return (
    <>
      <div className="card spacing">
        <Heading>Add Course</Heading>
        <Formik
          onSubmit={(values) => {
            createCourse(values)
            navigate('../')
          }}
          initialValues={initialValues}
          validationSchema={formSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isValid, values }) => (
            <Form className="spacing maxw-180" noValidate>
              {!isValid && <Notice type="error">Please Fix Errors</Notice>}
              <div className="flex flex-gap">
                <div className="flex-1">
                  <FieldInput label="Course Name" name="name" required autoComplete="off" />
                </div>
                <div className="flex-1">
                  <FieldInput
                    label="Course Slug"
                    name="slug"
                    placeholder="No Spaces"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <footer>
                <button type="submit" className="button">
                  Save
                </button>
              </footer>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
