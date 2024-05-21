let itemCount = 0

export async function serverAddItem() {
  await new Promise((res) => setTimeout(res, 800))
  itemCount++
  // if (itemCount === 5) throw Error('Bad Request')

  return new Response(JSON.stringify({ items: itemCount }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

export async function saveUser(firstName: string | undefined, lastName: string | undefined) {
  await new Promise((res) => setTimeout(res, 1200))
  let status = 200
  let responseData: Record<string, any> = { success: true }
  const errors: string[] = []

  if (firstName.length === 0) errors.push('First Name is required')
  if (lastName.length === 0) errors.push('Last Name is required')
  if (errors.length > 0) {
    status = 400
    responseData = { errors }
  }

  return new Response(JSON.stringify(responseData), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
