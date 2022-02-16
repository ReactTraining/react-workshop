import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { FieldInput } from 'course-platform/FormFields'
import { Heading } from 'course-platform/Heading'
import { Notice } from 'course-platform/Notice'
import { schemas } from 'course-platform/utils/validationSchemas'
import { useMutation } from 'react-query'
import { api } from 'course-platform/utils/api'
import { queryClient } from './queryClient'
// import { useCreateCourse } from './useCourses'
import * as yup from 'yup'

const formSchema = yup.object().shape({
  name: schemas.courseName.required('Required'),
  slug: schemas.slug.required('Required'),
})

const initialValues = {
  name: '',
  slug: '',
}

/**
 * Work Here. Move to useCourses later
 */

// function useCreateCourse() {
//   type Data = { name: string; slug: string }
//   //                           2️⃣ this is called when mutation.mutate() is called
//   const mutation = useMutation(({ name, slug }: Data) => api.courses.create(name, slug), {
//     onSuccess: () => {
//       // 3️⃣ After the API call is successful. We could "refetch" or
//       // we could invalidate the cache
//       // https://react-query.tanstack.com/guides/invalidations-from-mutations
//     },
//   })
//   // 1️⃣ We're returning the "mutate" function. When it's called with data
//   // the above callback in useMutation will be called
//   return mutation.mutate
// }

/**
 * Component
 */

export function AddCourseForm() {
  // const { fetchCourses } = useCoursesContext()
  const navigate = useNavigate()

  return (
    <>
      <div className="card spacing">
        <Heading>Add Course</Heading>
        <Formik
          onSubmit={(values) => {
            return api.courses.create(values.name, values.slug).then(() => {
              // fetchCourses()
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
