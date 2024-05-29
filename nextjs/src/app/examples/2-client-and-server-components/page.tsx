import { ClientOne } from './client-one'

export default function Page() {
  return (
    <div>
      <div>this is a server only component</div>
      <hr />
      <ClientOne></ClientOne>
    </div>
  )
}
