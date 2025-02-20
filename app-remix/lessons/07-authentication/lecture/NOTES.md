Ways to create sessions

- ✅ `createCookieSessionStorage`
- ⬜️ `createMemorySessionStorage`
- ⬜️ `createFileSessionStorage` (node)
- ⬜️ `createWorkersKVSessionStorage` (Cloudflare Workers)
- ⬜️ `createArcTableSessionStorage` (architect, Amazon DynamoDB)
- ⬜️ `createSessionStorage` (custom)

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

Discussion:

Because we need auth all over the UI including the primary header, we get auth data in the root loader and then pass it down through context
