import { Heading } from '~/components/Heading'
import { Link } from 'react-router'
export default function Page() {
  return (
    <div>
      <Heading>Page 2</Heading>
      <div className="mt-6">
        <Link to="/" prefetch="intent">
          Go Home
        </Link>
      </div>
    </div>
  )
}
