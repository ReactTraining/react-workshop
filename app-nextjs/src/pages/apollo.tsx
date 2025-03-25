import { gql } from '@apollo/client'
import client from '../utils/apolloClient'

interface HomeProps {
  helloMessage: string
}

export default function Home({ helloMessage }: HomeProps) {
  return (
    <div>
      <h1>{helloMessage}</h1>
    </div>
  )
}

// Fetch data on the server-side
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query {
        hello
      }
    `,
  })

  return {
    props: {
      helloMessage: data.hello,
    },
  }
}
