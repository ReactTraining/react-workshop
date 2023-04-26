import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { useCoursesContext } from 'spa/CoursesContext'
import { FieldInput } from 'spa/FormFields'
import { Heading } from 'spa/Heading'
import { Notice } from 'spa/Notice'
import { api } from 'spa/utils/api'
import { schemas } from 'spa/utils/validationSchemas'
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
  const { fetchCourses } = useCoursesContext()
  const navigate = useNavigate()

  return (
    <>
      <div className="card spacing">
        <Heading>Add Course</Heading>
        <Formik
          onSubmit={(values) => {
            return api.courses.create(values.name, values.slug).then(() => {
              // In some lessons there is no fetchCourses because there is
              // no context
              fetchCourses && fetchCourses()
              navigate('../')
            })
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
