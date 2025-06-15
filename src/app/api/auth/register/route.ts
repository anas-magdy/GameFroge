import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { registerSchema } from '@/lib/authSchemas';

export async function POST(req: Request) {
  try {
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (err) {
      console.log(err)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate request body
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      const formattedErrors = result.error.format();
      const errorMessages = Object.entries(formattedErrors)
        .filter(([key]) => key !== '_errors')
        .map(([key, value]) => {
          if (Array.isArray(value)) {
            return `${key}: ${value.join(', ')}`;
          }
          if (value && typeof value === 'object' && '_errors' in value) {
            return `${key}: ${value._errors.join(', ')}`;
          }
          return `${key}: Invalid value`;
        })
        .join('; ');

      return NextResponse.json(
        {
          error: 'Validation failed',
          details: errorMessages || 'Invalid request data'
        },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Connect to database
    try {
      await connectDB();
    } catch (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    try {
      const user = await User.create({
        name,
        email,
        password,
      });

      // Remove password from response
      const userWithoutPassword = {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        emailVerified: user.emailVerified,
      };

      return NextResponse.json(
        {
          message: 'User registered successfully',
          user: userWithoutPassword
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('User creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Registration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Something went wrong', details: errorMessage },
      { status: 500 }
    );
  }
} 