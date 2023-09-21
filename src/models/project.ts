import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title: {
      type: String,
      unique: [true, 'Email already exist!'],
      required: [true, 'Email is required!']
    },
    genre: {
      type: [String],
      required: [true, 'Genre is required!']
    },
    synopsis: {
      type: String,
      required: [true, 'Synopsis is required!']
    },
    image: {
      public_id: {
        type: String
      },
      url: {
        type: String
      }
    },
    folders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }]
  },
  {
    timestamps: true
  }
);

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
