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

    // Simple authentication logic (replace with your actual auth logic)
    // For demo purposes, accept any username/password combination
    // In production, you would:
    // 1. Query your database for the user
    // 2. Verify the password hash
    // 3. Generate a JWT token or session

    if (password.length < 3) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Return user data (in production, include a JWT token)
    const user = {
      id: Date.now().toString(),
      username: username,
      name: username.charAt(0).toUpperCase() + username.slice(1),
    }

    return NextResponse.json(
      { 
        success: true,
        user,
        message: 'Login successful'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
