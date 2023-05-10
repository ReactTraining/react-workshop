# Lecture Notes

What is `Response`

```js
async function myFetch() {
  const res = new Response(JSON.stringify({ user: 'brad' }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
  return res
}

async function main() {
  const res = await myFetch()
  const data = await res.json()

  console.log(data.user) // brad
}

main()
```

## 200 Responses

```js
// These are same
return json({ user: 'brad' })
return new Response(JSON.stringify({ user: 'brad' }), {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})
```

## 300 Responses

```js
// These are same
return redirect('/new-path', 303)
return new Response(null, {
  status: 303,
  headers: {
    Location: '/new-path',
  },
})
```

## 400/500 Responses

```js
// To to error boundary
throw Error('whatever') // status: 500

// To to error boundary with custom status
throw new Response('We cant find this user', { status: 404 })
```

## Error Handling

From Docs: In v1, a thrown Response will render the closest CatchBoundary while all other unhandled exceptions render the ErrorBoundary. In v2 there is no CatchBoundary and all unhandled exceptions will render the ErrorBoundary, response or otherwise.

You cannot use `useLoaderData` or `useRouteLoaderData` in error handler
