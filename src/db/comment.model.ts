import validator from 'validator';
import { Schema, model, Types, Document } from "mongoose";


export enum CommentType {
  Comment = 'comment',
  Reply = 'reply',
}

export interface IComment extends Document {
  _id: Types.ObjectId,
  type: CommentType,
  username: string,
  email: string,
  content: string,
  replies: Types.ObjectId[],
}

// We will not split username and email to another table, cause they are purely for display purposes
// No authentication will be done
// Also maybe it will be better to split comments, replies to separate documents but I want it this way :)
export const schema = new Schema<IComment>({
  type: {
    type: String,
    index: true,
    required: true,
    validate: {
      validator: (v) => validator.isIn(v, Object.values(CommentType)),
      message: 'Invalid type',
    },
  },
  username: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'invalid email',
    },
  },
  content: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 200,
  },
  replies:[{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true,
});



export const Comment = model('Comment', schema);
