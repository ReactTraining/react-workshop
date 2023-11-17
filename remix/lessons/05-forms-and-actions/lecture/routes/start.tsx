import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'

export default function Page() {
  return (
    <div>
      <a href="/path?a=b">Here</a>

      <form action="path" method="POST">
        <input type="text" name="a" value="b" />
        <input type="text" name="a" value="b" />
        <input type="text" name="a" value="b" />
        <input type="text" name="a" value="b" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

// GET    --->     /products -> loader() -> component()
// POST   --->     /products -> action() -> component()
// PUT    --->     /products -> action() -> component()
// DELETE --->     /products -> action() -> component()
