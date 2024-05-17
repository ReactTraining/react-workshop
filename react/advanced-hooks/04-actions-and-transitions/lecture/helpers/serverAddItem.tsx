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
