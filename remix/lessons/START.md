```bash
npx create-remix@latest
```

What is Remix?

1. A compiler
2. A server-side HTTP handler
3. A server framework
4. A browser framework

It's built on the Web Fetch API instead of Node.js. This enables Remix to run in any Node.js server like Vercel, Netlify, Architect, etc. as well as non-Node.js environments like Cloudflare Workers and Deno Deploy.

```js
const remix = require('@remix-run/express')
const express = require('express')

const app = express()
app.all('*', remix.createRequestHandler({ build: require('./build') }))
```
