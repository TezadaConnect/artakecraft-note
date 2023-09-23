import { Schema, model, models } from 'mongoose';

const FolderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!']
    },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
    slot: {
      type: Number,
      required: [true, 'Name is required!']
    }
  },
  {
    timestamps: true
  }
);

const Folder = models.Folder || model('Folder', FolderSchema);

export default Folder;
