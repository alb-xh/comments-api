import { createYoga, createSchema } from "graphql-yoga";

import * as CommentResolvers from './comment.resolver.js';

export const schema = createSchema({
  resolvers: [ CommentResolvers.resolvers ],
  typeDefs: [ CommentResolvers.typeDef ]
});

export const yoga = createYoga({ schema });
