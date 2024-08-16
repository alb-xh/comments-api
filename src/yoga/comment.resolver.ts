import logger from 'loglevel';
import { Types } from 'mongoose';

import { IComment, CommentType, Comment } from "../db/comment.model.js";
import { Pagination } from "./types.js";
import { restrictPagination } from "./helpers.js";
import { Forbidden, InvalidIdError, NotFoundError } from './errors.js';

export const typeDef = /* GraphQL */ `
  type Query {
    comments(input: PaginationInput!): [Comment]
    comment(id: ID!): Comment
    replies(input: PaginationInput!): [Comment]
    reply(id: ID!): Comment
  }

  type Mutation {
    createComment(input: CommentInput!): Comment
    createReply(id: ID!, input: CommentInput!): Comment
  }

  input CommentInput {
    username: String!
    email: String!
    content: String!
  }

  type Comment {
    id: ID!
    username: String
    email: String
    type: String
    content: String
    replies: [ Comment ]
  }
`;

type CommentInput = {
  username: string,
  email: string,
  content: string,
}

export const resolvers = {
  Query: {
    comments: async (_: object, input: Pagination) => {
      logger.debug('Resolver: comments:', input);

      const { limit, offset } = restrictPagination(input);

      return Comment.find({ type: CommentType.Comment })
        .skip(offset)
        .limit(limit);
    },
    comment: async (_: object, id: string) => {
      logger.debug('Resolver: comment:', id);

      if (!Types.ObjectId.isValid(id)) {
        throw new InvalidIdError();
      }

      const comment = await Comment.findOne({ '_id': id, type: CommentType.Comment });

      if (!comment) {
        throw new NotFoundError();
      }

      return comment;
    },

    replies: async (_: object, input: Pagination) => {
      logger.debug('Resolver: replies:', input);

      const { limit, offset } = restrictPagination(input);

      return Comment.find({ type: CommentType.Reply })
        .skip(offset)
        .limit(limit);
    },

    reply: async (_: object, id: string) => {
      logger.debug('Resolver: reply:', id);

      if (!Types.ObjectId.isValid(id)) {
        throw new InvalidIdError();
      }

      const reply = await  Comment.findOne({ '_id': id, type: CommentType.Reply });

      if (!reply) {
        throw new NotFoundError();
      }

      return reply;
    },
  },
  Mutation: {
    createComment: async (_: object, { input }: { input: CommentInput }) => {
      logger.debug('Resolver: createComments:', input);

      return Comment.create({ ...input, type: CommentType.Comment })
    },
    createReply: async (_: object, { id, input }: { id: string, input: CommentInput }) => {
      logger.debug('Resolver: createReply:', input);

      if (!Types.ObjectId.isValid(id)) {
        throw new InvalidIdError();
      }

      const comment = await Comment.findOne({ '_id': id, type: CommentType.Comment });

      if (!comment) {
        throw new NotFoundError();
      }

      if (comment.replies.length > 20) {
        throw new Forbidden('Comment has reach maximum amount of replies!');
      }

      const reply = await Comment.create({ ...input, type: CommentType.Reply });

      comment.replies.push(reply._id);
      comment.save();

      return reply;
    }
  },
  Comment: {
    id: (comment: IComment) => comment._id,
    replies: async (comment: IComment) => Comment.find({ '_id': { $in: comment.replies } }),
  },
};