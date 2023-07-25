import { useState, useRef } from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { Dialog } from '~/Dialog'
import { FieldInput } from 'react2/_full-app/src/FormFields'
import { Heading } from 'react2/_full-app/src/Heading'
import { Notice } from '~/Notice'
import { api } from '~/utils/api'
import { schemas } from '~/utils/validationSchemas'
import type { Course, Lesson } from '~/utils/types'

const formSchema = yup.object().shape({
  name: schemas.lessonName.required('Required'),
  slug: schemas.slug.required('Required'),
})

const initialValues = {
  name: '',
  slug: '',
}

type Props = {
  course: Course
  onCreate(newLesson: Lesson): void
  onClose(): void
}

export function CreateLessonDialog({ course, onCreate, onClose }: Props) {
  const [recentSavedLesson, setRecentSavedLesson] = useState('')
  const nameRef = useRef<HTMLInputElement>(null!)

  return (
    <Dialog onClose={onClose} aria-label="Create Lesson Dialog">
      <div className="spacing">
        <Heading size={2}>
          Create Lesson For: <span className="text-blue">{course?.name || '...'}</span>
        </Heading>
        {recentSavedLesson && (
          <Notice type="success">
            <p>
              <b>{recentSavedLesson}</b> was saved.
            </p>
          </Notice>
        )}
        <Formik
          onSubmit={(values, { resetForm }) => {
            return api.courses
              .createLesson(course.id, values.name, values.slug, course.slug)
              .then((newLesson: Lesson) => {
                onCreate(newLesson)
                setRecentSavedLesson(values.name)
                resetForm()
                nameRef.current?.focus()
              })
          }}
          initialValues={initialValues}
          validationSchema={formSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {({ isValid }) => (
            <Form className="spacing maxw-180" noValidate>
              {!isValid && <Notice type="error">Please Fix Errors</Notice>}
              <div className="flex flex-gap">
                <div className="flex-1">
                  <FieldInput
                    ref={nameRef}
                    label="Lesson Name"
                    name="name"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="flex-1">
                  <FieldInput
                    label="Lesson Slug"
                    name="slug"
                    placeholder="No Spaces"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <footer className="flex-split">
                <div>
                  <button type="submit" className="button">
                    Save
                  </button>
                </div>
                <div>
                  <button type="button" className="button button-outline" onClick={onClose}>
                    Close
                  </button>
                </div>
              </footer>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  )
}
