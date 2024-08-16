import { createYoga, createSchema } from "graphql-yoga";

import * as CommentResolvers from './comment.resolver.js';

const commonTypeDefinitions = /* GraphQL */ `
  input PaginationInput {
    offset: Int!,
    limit: Int!,
  }
`;

export const schema = createSchema({
  resolvers: [ CommentResolvers.resolvers ],
  typeDefs: [ commonTypeDefinitions, CommentResolvers.typeDef ]
});

export const yoga = createYoga({ schema });
