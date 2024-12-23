import mongoose, {Document, Model, Schema} from 'mongoose';

export interface IPost extends Document {
  title: string;
  author: mongoose.Types.ObjectId; // Reference to User
  date: Date;
  description: string;
  imageUrl: string[];
  tags: string[];
}

const PostSchema: Schema = new Schema(
  {
    title: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, // User reference
    date: {type: Date, default: Date.now},
    description: {type: String, required: true},
    imageUrl: {type: [String], default: []},
    tags: {type: [String], default: []},
  },
  {timestamps: true}
);

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
