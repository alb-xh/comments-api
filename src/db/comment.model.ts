import { Schema, model } from "mongoose";

export const schema = new Schema({
  username: { type: String, required: true, maxLength: 20 },
  email: { type: String, required: true, lowercase: true, maxLength: 100 },
  content: { type: String, required: true, maxLength: 200 },
  replies: [ this ],
}, { timestamps: true });

export const Comment = model('Comment', schema);
