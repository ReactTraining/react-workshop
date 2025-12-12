import { type LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  console.log('Loader - Login')

  return
}

export default function Page() {
  return (
    <div>
      <h1>Register</h1>
    </div>
  )
}
