import {connectToDatabase} from '@/lib/db';
import User from '@/lib/models/user';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the JSON body
    const body = await req.json();
    const {userId, firstname, lastname, username} = body;

    // Validate required fields
    if (!userId || !firstname || !lastname || !username) {
      return NextResponse.json({error: 'All fields are required.'}, {status: 400});
    }

    // Connect to the database
    await connectToDatabase();

    // Update user photo
    const user = await User.findOneAndUpdate(
      {userId}, // Match the userId field
      {$set: {firstname: firstname, lastname: lastname, username: username}}, // Update the photo field
      {new: true} // Return the updated document
    );

    if (!user) {
      return NextResponse.json({error: 'This user does not exist.'}, {status: 404});
    }

    return NextResponse.json({message: 'Details updated successfully.', user: user}, {status: 200});
  } catch (error) {
    console.error('Failed to update:', error);
    return NextResponse.json(
      {error: 'Something went wrong. Please try again later.'},
      {status: 500}
    );
  }
}
