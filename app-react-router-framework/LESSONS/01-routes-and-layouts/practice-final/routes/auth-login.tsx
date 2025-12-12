import { type LoaderFunctionArgs } from 'react-router'

export async function loader({ request }: LoaderFunctionArgs) {
  console.log('Loader - Login')
}

export default function Page() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  )
}
