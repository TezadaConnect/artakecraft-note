import { Schema, model, models } from 'mongoose';

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Name is required!']
    },
    text: { type: String }
  },
  {
    timestamps: true
  }
);

const Note = models.User || model('Note', NoteSchema);

export default Note;
