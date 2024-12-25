import {connectToDatabase} from '@/lib/db';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const body = await req.json();
    const {userId, password, newPassword} = body;

    // Validate required fields
    if (!userId || !password) {
      return NextResponse.json({error: 'userId and image url are required.'}, {status: 400});
    }

    // Connect to the database
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({error: 'User not found.'}, {status: 404});
    }

    if (!user.password) {
      return NextResponse.json({error: 'Invalid credentials.'}, {status: 401});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({error: 'Invalid credentials.'}, {status: 401});
    }

    // Update user photo
    const updatedUser = await User.findOneAndUpdate(
      {userId}, // Match the userId field
      {$set: {password: newPassword}}, // Update the photo field
      {new: true} // Return the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({error: 'This user does not exist.'}, {status: 404});
    }

    return NextResponse.json({message: 'Password updated successfully.'}, {status: 200});
  } catch (error) {
    console.error('Failed to update:', error);
    return NextResponse.json(
      {error: 'Something went wrong. Please try again later.'},
      {status: 500}
    );
  }
}
