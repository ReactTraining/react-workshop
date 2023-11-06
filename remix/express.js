// HTTP:GET
app.get('/products', async (request, response) => {
  const product = await getProduct()

  response.send(<div />)
})
