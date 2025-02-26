import { Heading } from '~/components/Heading'
import { FieldWrap } from '~/components/FormFields'
import { useRouteLoaderData } from 'react-router'

// useRouteLoaderData('routes/account-layout')

export default function AccountIndex() {
  const user = { firstName: 'Bruce', lastName: 'Lee', email: 'wrongemail@remix.run' }

  return (
    <>
      <Heading size={3}>My Account</Heading>
      <form method="post" className="space-y-6" autoComplete="off">
        <FieldWrap label="First Name">
          {(field) => (
            <input
              {...field}
              className="form-field"
              name="first-name"
              defaultValue={user.firstName}
              type="text"
            />
          )}
        </FieldWrap>
        <FieldWrap label="Last Name">
          {(field) => (
            <input
              {...field}
              name="last-name"
              defaultValue={user.lastName}
              className="form-field"
              type="text"
            />
          )}
        </FieldWrap>
        <FieldWrap label="Email">
          {(field) => (
            <input
              {...field}
              name="email"
              defaultValue={user.email}
              className="form-field"
              type="text"
            />
          )}
        </FieldWrap>
        <footer className="flex justify-between items-center">
          <div />
          <div>
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </footer>
      </form>
    </>
  )
}
