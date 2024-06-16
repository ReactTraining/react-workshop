type Message = {
  id: number
  messageText: string
}
let messageCount = 0

export async function addMessage(messageText: string) {
  await new Promise((res) => setTimeout(res, 2500))
  let status = 200
  type ResponseType = { message?: Message; error?: string }
  let responseData: ResponseType = { message: { id: ++messageCount, messageText } }

  // if (item === 'Item 5') {
  //   status = 400
  //   responseData = { item, error: 'Error saving message 5' }
  // }

  return new Response(JSON.stringify(responseData), {
    status,
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
