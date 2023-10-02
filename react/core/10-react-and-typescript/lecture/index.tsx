function someFunction() {
  return Promise.resolve(123)
}

type fnT = Awaited<ReturnType<typeof someFunction>>
