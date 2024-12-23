import {connectToDatabase} from '@/lib/db';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';
import {omit} from 'lodash';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const body = await req.json();

    const {firstname, lastname, dob, location, username, photo, password} = body;

    // Validate required fields
    if (!firstname || !lastname || !dob || !location || !username || !password) {
      return NextResponse.json({error: 'All fields are required.'}, {status: 400});
    }

    // Connect to the database
    await connectToDatabase();

    // Check if the user already exists
    const userExists = await User.findOne({username});
    if (userExists) {
      return NextResponse.json({error: 'User already exists.'}, {status: 400});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      dob,
      location,
      username,
      password: hashedPassword,
      photo: photo || '', // Ensure photo is an empty string if undefined
    });

    // Save the new user to the database
    await newUser.save();

    // Remove sensitive fields before sending the response
    const registeredUserWithoutPassword = omit(newUser.toObject(), ['password']);

    // Send a success response
    return NextResponse.json(
      {
        message: 'User registered successfully.',
        user: registeredUserWithoutPassword,
      },
      {status: 201}
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({error: 'Something went wrong.'}, {status: 500});
  }
}
