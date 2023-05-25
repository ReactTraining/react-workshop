import { ActionArgs, LoaderArgs } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'

export default function () {
  return (
    <div>
      👋 Let's start here. Did you know a form and an anchor are essentially the same thing?
    </div>
  )
}

// GET    --->     /products [loader] -> [component]
// POST   --->     /products [action] -> [component]
// PUT    --->     /products [action] -> [component]
// DELETE --->     /products [action] -> [component]
