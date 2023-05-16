import { Heading } from '~/components/Heading'
import { FieldWrap } from '~/components/FormFields'
import { Link } from '@remix-run/react'
// import type { LoaderData } from './account'

export default function () {
  const settings = { deals: 'weekly', delivery: 'door' }

  return (
    <>
      <Heading size={3}>My Settings</Heading>
      <form method="post" className="space-y-6" autoComplete="off">
        <FieldWrap label="Email me about deals">
          <select name="deals" defaultValue={settings.deals} className="form-field">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="holidays">Holidays</option>
          </select>
        </FieldWrap>
        <FieldWrap label="Delivery Preference">
          <select name="deals" defaultValue={settings.delivery} className="form-field">
            <option value="door">Door Drop Off</option>
            <option value="in-person">In-Person</option>
          </select>
        </FieldWrap>
        <footer className="flex justify-between items-center">
          <div>
            <Link to=".." className="button button-outline">
              Back to Account
            </Link>
          </div>
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
