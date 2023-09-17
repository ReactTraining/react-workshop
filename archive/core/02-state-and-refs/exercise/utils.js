export function login(username, password) {
  if (username === 'admin' && password === 'admin') {
    // Pretend to resolve a user object from the server
    return Promise.resolve({
      userId: 1,
      name: 'Admin',
    })
  }
  return Promise.reject('Login Failed')
}
