'use server'

export async function ServerTwo() {
  console.log('SERVER TWO WHERE.....')
  return (
    <div className="bg-purple-200 p-4">
      <span>Server Two</span>
    </div>
  )
}
