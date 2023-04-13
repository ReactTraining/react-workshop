import { useState } from 'react'
import * as yup from 'yup'
import { Avatar } from 'spa/Avatar'
import { Formik, Form } from 'formik'
import { FieldInput } from 'spa/FormFields'
import { Heading } from 'spa/Heading'
import { Notice } from 'spa/Notice'
import { api } from 'spa/utils/api'
import type { User } from 'spa/utils/types'
import { schemas } from 'spa/utils/validationSchemas'

const formSchema = yup.object().shape({
  name: schemas.fullName.required('Required'),
  username: schemas.username.required('Required'),
  password: schemas.password.required('Required'),
})

const initialValues = {
  name: '',
  username: '',
  password: '',
}

type Props = {
  onSuccess(user: User): void
}

export const Signup = ({ onSuccess }: Props) => {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loadingAvatar, setLoadingAvatar] = useState(false)

  function fetchAvatar(username: string) {
    if (!username) return
    setLoadingAvatar(true)
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((user) => {
        setLoadingAvatar(false)
        if (user) {
          setAvatarUrl(user.avatar_url || '')
        }
      })
  }

  return (
    <div className="spacing">
      <Heading>Signup</Heading>
      <Formik
        onSubmit={(values) => {
          const { name, username, password } = values
          return api.users.registerUser({ name, username, password, avatarUrl }).then((user) => {
            onSuccess(user)
          })
        }}
        initialValues={initialValues}
        validationSchema={formSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ isValid, values, isSubmitting }) => (
          <Form noValidate>
            <div className="flex flex-gap-large">
              <div className="w-25">
                <Avatar src={avatarUrl} size={6} />
                {loadingAvatar && (
                  <div className="text-small text-center">Loading Image From GitHub</div>
                )}
              </div>
              <div className="flex-1 spacing">
                {!isValid && <Notice type="error">Please Fix Errors</Notice>}
                <FieldInput label="Full Name" name="name" required autoComplete="off" />
                <FieldInput
                  label="Username"
                  name="username"
                  placeholder="If you use your github username, we'll load your avatar"
                  required
                  autoComplete="off"
                  onBlur={() => fetchAvatar(values.username)}
                />
                <FieldInput
                  type="password"
                  label="Password"
                  name="password"
                  placeholder="We save this in plaintext on your machine"
                  required
                  autoComplete="off"
                />
                <footer>
                  <button type="submit" className="button" disabled={isSubmitting}>
                    Signup
                  </button>
                </footer>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
