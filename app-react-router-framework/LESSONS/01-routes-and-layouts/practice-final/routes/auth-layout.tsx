import { redirect, type LoaderFunctionArgs } from 'react-router'
import { Outlet } from 'react-router'

// on the server
export async function loader({ request }: LoaderFunctionArgs) {
  if (request.url.replace(/\/$/, '').endsWith('auth')) {
    return redirect('/auth/login')
  }

  return null
}

export default function Page() {
  return (
    <div className="p-3 bg-green-300 border rounded space-y-3">
      <div className="p-3 bg-green-200 rounded">
        <h1>Auth Layout</h1>
      </div>
      <main className="p-3 bg-green-200 rounded">
        <Outlet />
      </main>
    </div>
  )
}
