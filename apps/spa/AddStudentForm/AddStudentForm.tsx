import { useRef } from 'react'
import { Formik, Form } from 'formik'
import { FieldInput } from 'spa/FormFields'
import { Heading } from 'spa/Heading'
import { Notice } from 'spa/Notice'
import { api } from 'spa/utils/api'
import { schemas } from 'spa/utils/validationSchemas'
import * as yup from 'yup'

const formSchema = yup.object().shape({
  name: schemas.studentName.required('Required'),
  username: schemas.username.required('Required'),
})

const initialValues = {
  name: '',
  username: '',
}

type Props = {
  onCreate(): void
}

export function AddStudentForm({ onCreate }: Props) {
  const firstFieldRef = useRef<HTMLInputElement>(null!)

  return (
    <>
      <>
        <Heading size={3}>Add Student</Heading>
        <Formik
          onSubmit={(values, { resetForm }) => {
            return api.students.create(values.name, values.username).then(() => {
              onCreate()
              resetForm()
              firstFieldRef.current.focus()
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
              <FieldInput
                label="Student Name"
                name="name"
                required
                autoComplete="off"
                ref={firstFieldRef}
              />
              <FieldInput
                label="Username"
                name="username"
                placeholder="No Spaces"
                required
                autoComplete="off"
              />
              <footer>
                <button type="submit" className="button">
                  Add Student
                </button>
              </footer>
            </Form>
          )}
        </Formik>
      </>
    </>
  )
}
