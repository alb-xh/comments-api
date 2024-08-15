import { createYoga } from "graphql-yoga";

import { createSchema } from 'graphql-yoga'

const typeDefinitions = /* GraphQL */ `
  type Query {
    hello: String!
  }
`
const resolvers = {
  Query: {
    hello: () => 'Hello World!'
  }
};

export const schema = createSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions]
})


export const yoga = createYoga({ schema });