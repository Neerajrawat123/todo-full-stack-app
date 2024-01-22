import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tasks : [{
        task: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        due_date: {
          type: Date,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        created_at: {
          type: Date,
          default: Date.now,
        },
        updated_at: {
          type: Date,
          default: Date.now,
        }}]
})

export const Todo = mongoose.model('Todo', TodoSchema)