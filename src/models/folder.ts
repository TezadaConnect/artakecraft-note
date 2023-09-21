import { Schema, model, models } from 'mongoose';

const FolderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!']
    },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
  },
  {
    timestamps: true
  }
);

const Folder = models.User || model('Folder', FolderSchema);

export default Folder;
