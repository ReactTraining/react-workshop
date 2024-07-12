import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'

export default function Page() {
  return <div></div>
}

// GET    --->     /products -> loader() -> component()
// POST   --->     /products -> action() -> component()
// PUT    --->     /products -> action() -> component()
// DELETE --->     /products -> action() -> component()
