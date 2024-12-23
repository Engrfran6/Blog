import {connectToDatabase} from '@/lib/db';
import Post from '@/lib/models/post';
import User from '@/lib/models/user';
import {NextResponse} from 'next/server';

// Handle POST request to create a post
export async function handlePOST(req) {
  try {
    // Parse the JSON body
    const body = await req.json();

    const {title, date, description, author, imageUrl, tags} = body;

    // Validate the user
    await connectToDatabase();
    const user = await User.findById(author);
    if (!user) {
      return NextResponse.json({error: 'User not found.'}, {status: 400});
    }

    // Validate required fields
    if (!title || !date || !description || !imageUrl || !tags?.length) {
      return NextResponse.json({error: 'All fields are required to create a post.'}, {status: 400});
    }

    // Create a new post
    const newPost = await Post.create({
      title,
      date,
      description,
      author,
      imageUrl,
      tags,
    });

    // Populate author details in the new post
    const postWithUser = await newPost.populate('author', 'firstname lastname');

    // Update the user's post list
    await User.findByIdAndUpdate(author, {$push: {posts: newPost._id}}, {new: true});

    return NextResponse.json(
      {message: 'Post created successfully.', post: postWithUser},
      {status: 200}
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({error: 'Failed to create post.'}, {status: 500});
  }
}
