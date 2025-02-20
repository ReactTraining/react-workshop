import { Card } from '~/Card'
import { Heading } from './Heading'

type Props = {
  children?: React.ReactNode
}

export function NotFoundPage({ children }: Props) {
  return (
    <Card>
      <Heading>Not Found</Heading>
      <p>Sorry but we can't find this content</p>
    </Card>
  )
}
