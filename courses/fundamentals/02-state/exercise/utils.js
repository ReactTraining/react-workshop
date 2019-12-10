export function updateCart(cart, id, quantity) {
  const found = cart.find(p => p.id === id)
  if (!found) {
    return cart.concat([
      {
        id,
        quantity,
      },
    ])
  } else {
    const index = cart.findIndex(p => p.id === id)
    const updatedProduct = quantity > 0 ? Object.assign({}, cart[index], { quantity }) : false
    const updatedCart = [...cart.slice(0, index), updatedProduct, ...cart.slice(index + 1)].filter(
      Boolean
    )
    return updatedCart
  }
}
