import mongoose from 'mongoose';
import {NextResponse} from 'next/server';
import {connectToDatabase} from '../db';
import Post from '../models/post';

export async function handlePUT({body}, {id}) {
  try {
    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({error: 'Invalid ID format'}, {status: 400});
    }

    // Check for fields to update
    if (!body.title && !body.description) {
      return NextResponse.json({error: 'Nothing to update'}, {status: 400});
    }

    await connectToDatabase();

    // Update post by ID
    const updatedPost = await Post.findByIdAndUpdate(id, body, {new: true});

    if (!updatedPost) {
      return NextResponse.json({error: 'Post not found'}, {status: 404});
    }

    return NextResponse.json(updatedPost, {status: 200});
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
