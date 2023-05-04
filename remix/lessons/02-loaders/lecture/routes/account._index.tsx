import { Heading } from '~/components/Heading'
import { FieldWrap } from '~/components/FormFields'
// import type { LoaderData } from './account'

export default function () {
  const user = { firstName: 'Bruce', lastName: 'Lee', email: 'wrongemail@remix.run' }

  return (
    <>
      <Heading size={3}>My Account</Heading>
      <form method="post" className="space-y-6">
        <FieldWrap label="First Name">
          <input
            name="first-name"
            defaultValue={user.firstName}
            className="form-field"
            type="text"
          />
        </FieldWrap>
        <FieldWrap label="Last Name">
          <input name="last-name" defaultValue={user.lastName} className="form-field" type="text" />
        </FieldWrap>
        <FieldWrap label="Email">
          <input name="email" defaultValue={user.email} className="form-field" type="text" />
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
