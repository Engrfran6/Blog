import mongoose from 'mongoose';
import {NextResponse} from 'next/server';
import Post from '../models/post';
import User from '../models/user';

// Handle DELETE request to delete a post
export async function handleDELETE({id}) {
  try {
    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({error: 'Invalid ID format'}, {status: 400});
    }

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return NextResponse.json({error: 'Post not found'}, {status: 404});
    }

    await User.updateMany({posts: id}, {$pull: {posts: id}});

    return NextResponse.json({message: 'Post deleted successfully'}, {status: 200});
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
