import { Schema, model } from "mongoose";

// We will not slip username and email to another table, cause they are purely for display purposes
// No authentication will be done
export const schema = new Schema({
  username: { type: String, required: true, minLength: 1,  maxLength: 20 },
  email: { type: String, required: true, lowercase: true, minLength: 1, maxLength: 100 },
  content: { type: String, required: true, minLength: 1, maxLength: 200 },
  replies:[{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
}]
}, { timestamps: true });

export const Comment = model('Comment', schema);
