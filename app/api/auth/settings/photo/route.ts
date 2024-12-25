import {connectToDatabase} from '@/lib/db';
import User from '@/lib/models/user';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const body = await req.json();
    const {userId, imageUrl} = body;

    // Validate required fields
    if (!userId || !imageUrl) {
      return NextResponse.json({error: 'userId and image url are required.'}, {status: 400});
    }

    // Connect to the database
    await connectToDatabase();

    // Update user photo
    const user = await User.findOneAndUpdate(
      {userId}, // Match the userId field
      {$set: {photo: imageUrl}}, // Update the photo field
      {new: true} // Return the updated document
    );

    if (!user) {
      return NextResponse.json({error: 'This user does not exist.'}, {status: 404});
    }

    return NextResponse.json(
      {message: 'Photo updated successfully.', photo: user.photo},
      {status: 200}
    );
  } catch (error) {
    console.error('Failed to update:', error);
    return NextResponse.json(
      {error: 'Something went wrong. Please try again later.'},
      {status: 500}
    );
  }
}
