export default function slowFunction() {
  const x = 1000000000
  for (let i = 0; i < x; i++) {
    // Nothing to see here. Just a slow function
  }
  return x
}
