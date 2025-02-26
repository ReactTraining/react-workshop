import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useActionData } from 'react-router'

export default function Page() {
  return (
    <div>
      👋 Let's start here. Did you know a form and an anchor are essentially the same thing?
    </div>
  )
}

// GET    --->     /products -> loader() -> component()
// POST   --->     /products -> action() -> component()
// PUT    --->     /products -> action() -> component()
// DELETE --->     /products -> action() -> component()
