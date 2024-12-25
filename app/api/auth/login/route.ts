import {connectToDatabase} from '@/lib/db';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';
import {omit} from 'lodash';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {username, password} = body;

    if (!username || !password) {
      return NextResponse.json({error: 'Username and password are required.'}, {status: 400});
    }

    await connectToDatabase();

    const user = await User.findOne({username}).populate('posts');

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

    const authUserWithoutPassword = omit(user.toObject(), ['password']);

    return NextResponse.json(
      {
        success: 'Login successful.',
        user: authUserWithoutPassword,
      },
      {status: 200}
    );
  } catch (error) {
    return NextResponse.json({error: `Something went wrong: ${error}`}, {status: 500});
  }
}
