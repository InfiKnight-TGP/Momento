import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    if (username.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters' },
        { status: 400 }
      )
    }

    // In production, you would:
    // 1. Check if username already exists in database
    // 2. Hash the password (bcrypt, argon2, etc.)
    // 3. Create user record in database
    // 4. Generate JWT token or session

    // For demo purposes, accept registration
    const user = {
      id: Date.now().toString(),
      username: username,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(
      { 
        success: true,
        user,
        message: 'Registration successful'
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}
