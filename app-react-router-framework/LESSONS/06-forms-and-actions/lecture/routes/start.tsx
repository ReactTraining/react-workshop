import { Form, Link, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router'

export default function Page() {
  return (
    <div>
      <a href="/somepath?hello=world">Word</a>

      <Form method="GET">
        <input type="text" name="hello" value="world" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  )
}

// GET    --->     /products -> loader() -> component()
// POST   --->     /products -> action() -> component()
// PUT    --->     /products -> action() -> component()
// DELETE --->     /products -> action() -> component()
