import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from 'graphql-tag'

// Define a simple GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// Define resolvers for schema
const resolvers = {
  Query: {
    hello: () => 'Hello ezCater, from Apollo',
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })
export default startServerAndCreateNextHandler(apolloServer)
