let itemCount = 0

export async function addItem() {
  await new Promise((res) => setTimeout(res, 800))
  itemCount++
  // if (itemCount === 5) throw Error('Bad Request')

  return new Response(JSON.stringify({ items: itemCount }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

export async function changeQuantity(quantity: number) {
  await new Promise((res) => setTimeout(res, 1500))
  let status = 200
  type ResponseType = { quantity: number; error?: string }
  let responseData: ResponseType = { quantity }

  if (quantity > 5) {
    status = 400
    responseData = { quantity: 5, error: 'We only have 5' }
  }

  return new Response(JSON.stringify(responseData), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}

export async function saveUser(firstName: string | undefined, lastName: string | undefined) {
  await new Promise((res) => setTimeout(res, 1500))
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
