import { IComment, Comment } from "../db/comment.model.js";
import { Pagination } from "./types.js";
import { restrictPagination } from "./helpers.js";

export const typeDef = /* GraphQL */ `
  type Query {
    comments(pagination: PaginationInput): [Comment]
    comment(id: ID): Comment
  }

  input PaginationInput {
    offset: Int,
    limit: Int,
  }

  type Comment {
    id: ID
    username: String
    email: String
    content: String
    replies: [ Comment ]
  }
`;

export const resolvers = {
  Query: {
    comments: (_: object, pagination: Pagination) => {
      const { limit, offset } = restrictPagination(pagination);

      return Comment.find().skip(offset).limit(limit);
    },
    comment: (_: object, id: string) => Comment.findById(id),
  },
  Comment: {
    id: (comment: IComment) => comment._id,
  },
};