import { ActionArgs, LoaderArgs } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'

export default function () {
  return (
    <div>
      <a href="/place?a=234">Link</a>

      <form method="GET">
        <input type="text" name="a" value="234" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

// GET    --->     /products [loader] -> [component]
// POST   --->     /products [action] -> [component]
// PUT    --->     /products [action] -> [component]
// DELETE --->     /products [action] -> [component]
