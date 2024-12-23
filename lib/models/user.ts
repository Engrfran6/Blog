import mongoose, {Document, Model, Schema} from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  dob: Date;
  location: string;
  photo?: string;
  posts: mongoose.Types.ObjectId[]; // Array of Post references
}

const UserSchema: Schema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    dob: {type: Date, required: true},
    location: {type: String, required: true},
    photo: {type: String, default: null},
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}], // Array of Post references
  },
  {timestamps: true}
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
