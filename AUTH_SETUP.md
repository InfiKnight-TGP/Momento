# Authentication Setup

This project now includes a simple authentication system ready for Vercel deployment.

## Features

- **Login Page** (`/login`) - Simple username/password authentication
- **Register Page** (`/register`) - User registration with password confirmation
- **Protected Routes** - Main app requires authentication
- **Auth Context** - Global authentication state management
- **Logout Functionality** - Navbar with user info and logout button

## How It Works

### Demo Mode (Current Implementation)

For demo purposes, the authentication accepts any username/password combination (minimum 3 characters for password).

**Test it out:**
1. Go to `/login`
2. Enter any username (e.g., "demo")
3. Enter any password (at least 3 characters)
4. Click "Sign In"

### Pages

- **`/login`** - Login page with username and password fields
- **`/register`** - Registration page with password confirmation
- **`/`** - Protected home page (redirects to login if not authenticated)

### API Routes

- **`POST /api/auth/login`** - Authenticates user and returns user object
- **`POST /api/auth/register`** - Creates new user account
- **`POST /api/auth/logout`** - Logs out user

### Components

- **`AuthContext`** - React Context for managing auth state across the app
- **`Navbar`** - Top navigation bar with user info and logout button

## Production Setup

To make this production-ready, you would need to:

### 1. Add a Real Database

Replace the demo authentication with actual database queries:

```typescript
// In /api/auth/login/route.ts
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'

// Check if user exists
const user = await prisma.user.findUnique({
  where: { username }
})

// Verify password
const isValid = await bcrypt.compare(password, user.passwordHash)
```

### 2. Update Prisma Schema

Add a User model to `prisma/schema.prisma`:

```prisma
model User {
  id           String   @id @default(cuid())
  username     String   @unique
  email        String?  @unique
  passwordHash String
  name         String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  memories     Memory[]
}

model Memory {
  // ... existing fields
  userId       String
  user         User     @relation(fields: [userId], references: [id])
}
```

### 3. Add Password Hashing

Install bcrypt and hash passwords on registration:

```bash
npm install bcrypt
npm install -D @types/bcrypt
```

```typescript
// In /api/auth/register/route.ts
import bcrypt from 'bcrypt'

const passwordHash = await bcrypt.hash(password, 10)
await prisma.user.create({
  data: {
    username,
    passwordHash,
    name: username
  }
})
```

### 4. Add JWT Tokens or Sessions

Install NextAuth.js for production-ready authentication:

```bash
npm install next-auth
```

Or implement JWT tokens:

```bash
npm install jsonwebtoken
npm install -D @types/jsonwebtoken
```

### 5. Add Environment Variables

Create `.env.local` for production:

```env
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

### 6. Implement Middleware

Create `middleware.ts` in the root to protect API routes:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  
  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/auth|login|register|_next/static|_next/image|favicon.ico).*)'],
}
```

## Deployment to Vercel

The current demo version will work on Vercel without any additional setup!

1. Push to GitHub
2. Import project in Vercel
3. Deploy

For production with database:

1. Add PostgreSQL database (Vercel Postgres or Supabase)
2. Add environment variables in Vercel dashboard
3. Run `prisma migrate deploy` in build command

## Current User Flow

1. User visits app → Redirected to `/login`
2. User enters credentials → Stored in localStorage
3. User redirected to home → Sees their memory book
4. User can click logout → Clears localStorage → Redirected to login

## Security Notes

⚠️ **Current implementation is for DEMO purposes only!**

For production, you MUST:
- Hash passwords (never store plain text)
- Use HTTP-only cookies for tokens (not localStorage)
- Implement CSRF protection
- Add rate limiting on auth endpoints
- Validate and sanitize all inputs
- Use HTTPS only
- Implement session management
- Add email verification
- Add password reset functionality

## Customization

To customize the login experience:

1. **Change colors**: Edit Tailwind classes in `login/page.tsx`
2. **Add social login**: Integrate OAuth providers
3. **Add remember me**: Store longer-lived tokens
4. **Add 2FA**: Implement two-factor authentication
5. **Add email**: Replace username with email field

## Testing

Test the authentication flow:

```bash
# Start dev server
npm run dev

# Navigate to:
http://localhost:3000/login

# Try logging in with any credentials
```

---

**Made for Momento** 📖 - Your AI-Powered Memory Journal
