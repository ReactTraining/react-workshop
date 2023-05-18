```ts
// Create
const storage = createCookieSessionStorage({
  cookie: {
    // ...
  },
})

// Get with or without Request
const session = await storage.getSession()
const session = await storage.getSession(request.headers.get('Cookie'))

// Set
session.set('userId', userId)

// Return from action
return redirect('/', {
  headers: {
    'Set-Cookie': await storage.commitSession(session),
  },
})
```
