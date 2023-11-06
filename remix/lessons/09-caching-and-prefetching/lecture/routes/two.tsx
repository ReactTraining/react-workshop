export const loader = async () => {
  console.log('> LOADER TWO')
  return null
}

export default function PageTwo() {
  return <h1>Two</h1>
}
