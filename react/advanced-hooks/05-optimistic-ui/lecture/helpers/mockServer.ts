export type ResponseData = { likes: number; error?: string }

// Function mimics slower network response times
export async function updateDatabase(likes: number) {
  await new Promise((res) => setTimeout(res, 1000))

  let status = 200
  let responseData: ResponseData = { likes }

  if (likes >= 5) {
    status = 400
    responseData = { likes: 4, error: 'Error saving 5 or more likes' }
  }

  return new Response(JSON.stringify(responseData), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
