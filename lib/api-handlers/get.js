import {connectToDatabase} from '@/lib/db';
import {NextResponse} from 'next/server';
import Post from '../models/post';

// Handle GET request to fetch all posts
export async function handleGET() {
  try {
    // Dynamically import User to ensure it's registered
    await import('@/lib/models/user');
    await connectToDatabase();

    // Fetch all posts and populate author details
    const posts = await Post.find().populate('author', 'firstname lastname').exec();

    return NextResponse.json(posts, {status: 200});
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({error: 'Failed to fetch posts'}, {status: 500});
  }
}
