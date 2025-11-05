# Momento 📖

An AI-powered digital scrapbook that transforms your photos and stories into beautiful, vintage-style postcard memories. Momento uses Google's Gemini AI to analyze both images and personal narratives, creating poetic titles and handwritten-style messages that capture the essence of each moment.

## ✨ Features

- 📸 **Photo Upload**: Modern drag-and-drop modal interface for adding memories
- ✍️ **Natural Storytelling**: Write about your memories conversationally (minimum 50 characters)
- 🤖 **AI-Powered Insights**: Gemini 2.5 Flash analyzes photos and stories to generate:
  - Poetic, vintage postcard-style titles
  - Warm, handwritten-style descriptions
  - Emotion tags and themes
  - People, locations, and events extraction
- 🎨 **Vintage Postcard UI**: Interactive flip cards with:
  - Front: Beautiful photo with title overlay
  - Back: Handwritten note with AI-generated message
  - Random rotation angles for authentic scrapbook feel
- 📚 **Scrapbook Gallery**: Masonry grid layout with 3D flip animations
- 🔖 **Bookmark Button**: Floating action button for quick memory creation
- 📱 **Mobile Responsive**: Optimized for all screen sizes
- ☁️ **Cloud Storage**: Photos stored securely in Google Cloud Storage
- 📄 **Pagination**: Efficient loading with 20 memories per page

## 🛠️ Tech Stack

- **Frontend**: Next.js 14.2.15, React 18.3.1, TypeScript 5.6.3, Tailwind CSS 3.4.14
- **Backend**: Next.js API Routes, Prisma ORM 5.22.0
- **AI**: Google Vertex AI with Gemini 2.5 Flash
- **Storage**: Google Cloud Storage 7.12.0
- **Database**: SQLite (via Prisma, easily swappable to PostgreSQL)
- **Fonts**: Custom handwritten fonts (Caveat, Dancing Script)
- **Icons**: Lucide React 0.408.0
- **Deployment**: Vercel-ready


## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Google Cloud Project with the following APIs enabled:
  - Vertex AI API
  - Cloud Storage API

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd momento
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:
```env
# Database (SQLite by default)
DATABASE_URL="file:./prisma/dev.db"

# Google Cloud
GOOGLE_CLOUD_PROJECT="your-project-id"
GOOGLE_CLOUD_STORAGE_BUCKET="your-bucket-name"

# Google Vertex AI
GOOGLE_VERTEX_AI_LOCATION="us-central1"
```

4. Set up the database
```bash
npm run db:migrate    # Run Prisma migrations
npm run db:studio     # (Optional) Open Prisma Studio
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your scrapbook!

## 📁 Project Structure

```
src/
├── app/
│   ├── api/memories/          # API routes for CRUD operations
│   │   └── route.ts           # GET (with pagination) & POST endpoints
│   ├── globals.css            # Global styles + postcard animations
│   ├── layout.tsx             # Root layout with metadata
│   └── page.tsx               # Home page with scrapbook grid
├── components/
│   ├── AddMemoryModal.tsx     # Modal for creating new memories
│   ├── BookmarkButton.tsx     # Floating bookmark FAB
│   ├── PostcardCard.tsx       # 3D flip postcard component
│   ├── PhotoUpload.tsx        # [Legacy] Photo upload widget
│   ├── StoryInput.tsx         # [Legacy] Story input field
│   ├── CreateMemory.tsx       # [Legacy] Old creation form
│   └── MemoryGallery.tsx      # [Legacy] Old gallery view
├── lib/
│   ├── ai.ts                  # Gemini AI integration with prompt engineering
│   ├── db.ts                  # Prisma client singleton
│   └── storage.ts             # Google Cloud Storage upload logic
├── types/
│   └── memory.ts              # TypeScript type definitions
└── prisma/
    ├── schema.prisma          # Database schema (SQLite)
    ├── dev.db                 # SQLite database file
    └── migrations/            # Database migration history
```

## 🎨 How It Works

1. **Click the Bookmark**: Floating bookmark button in the top-right corner
2. **Upload a Photo**: Drag and drop or browse for an image
3. **Tell Your Story**: Write naturally about the moment (minimum 50 characters)
4. **AI Magic**: Gemini 2.5 Flash analyzes your photo and story to create:
   - A catchy vintage postcard title (max 6 words)
   - A warm, handwritten-style message (2-3 sentences)
   - Emotion tags, themes, locations, and events
5. **View Your Postcard**: Click any postcard to flip and read the AI-generated message
6. **Random Rotations**: Each postcard has a unique tilt for an authentic scrapbook feel

## 🤖 AI Integration

The application uses **Google's Gemini 2.5 Flash** model for multimodal analysis (image + text). The AI is prompted with specific instructions to act as a "poetic postcard writer" that creates:

- **Vintage Titles**: Short, catchy phrases like "Greetings from Paris!" or "A Perfect Sunset Moment"
- **Handwritten Messages**: Warm, personal 2-3 sentence notes that capture the essence and emotion
- **Structured Insights**: JSON-formatted tags including:
  - Emotions (peaceful, grateful, joyful, etc.)
  - People and their relationships
  - Life themes (family, travel, celebration)
  - Locations mentioned or detected
  - Events that occurred

### Image Processing
- Images are fetched from Google Cloud Storage
- Converted to base64 for Vertex AI API
- Analyzed together with the user's story for context-aware insights

## 🗄️ Database Schema

The application uses SQLite (easily swappable to PostgreSQL) with a single `Memory` model:

```prisma
model Memory {
  id          String   @id @default(cuid())
  imageUrl    String
  story       String
  
  // AI-generated content
  title       String?  @default("Untitled Memory")
  description String?
  
  // AI-extracted insights (stored as JSON strings for SQLite compatibility)
  emotions    String?
  people      String?
  themes      String?
  locations   String?
  events      String?

  // Search and discovery
  embedding   String?
  keywords    String?
  
  createdAt   DateTime @default(now())
  
  @@index([createdAt])
}
```

**Key Changes from Original Design:**
- Switched from PostgreSQL Json fields to String fields for SQLite compatibility
- Added `title` and `description` fields for AI-generated postcard content
- Data is serialized as JSON strings and parsed in the application layer


## 🚢 Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard:
   - `GOOGLE_CLOUD_PROJECT`
   - `GOOGLE_CLOUD_STORAGE_BUCKET`
   - `GOOGLE_VERTEX_AI_LOCATION`
   - `DATABASE_URL` (use a production database like PostgreSQL or Supabase)
4. Deploy!

The application is configured for zero-config deployment with the included `vercel.json`.

### Database for Production

**Option 1: Switch to PostgreSQL**
Update `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Change String fields to Json
emotions    Json?
people      Json?
themes      Json?
```

**Option 2: Use Supabase (PostgreSQL)**
- Create a Supabase project
- Get your connection string
- Update `DATABASE_URL` in environment variables

## 📝 Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run db:migrate  # Run Prisma migrations
npm run db:studio   # Open Prisma Studio
```

## 🎯 Recent Major Updates

### UI/UX Overhaul
- ✅ Replaced standard gallery with vintage postcard design
- ✅ Added 3D flip card animations (front: photo, back: story)
- ✅ Implemented random rotation angles for authentic scrapbook look
- ✅ Created floating bookmark button for memory creation
- ✅ Added handwritten fonts (Caveat, Dancing Script)
- ✅ Redesigned modal interface with preview and validation

### AI Enhancement
- ✅ Upgraded from Gemini 1.5 Pro to Gemini 2.5 Flash
- ✅ Changed prompt engineering to generate vintage postcard-style content
- ✅ Added title generation (max 6 words)
- ✅ Added poetic description generation (2-3 sentences)
- ✅ Fixed image processing (base64 conversion)

### Database Changes
- ✅ Migrated from PostgreSQL to SQLite for easier development
- ✅ Added `title` and `description` fields
- ✅ Changed Json fields to String fields (SQLite compatibility)
- ✅ Created initial migration `20251104181228_init`

### API Improvements
- ✅ Added pagination support (20 memories per page)
- ✅ Added minimum character validation (50 chars)
- ✅ Improved error handling and logging
- ✅ Better response structure with metadata

### Dependency Updates
- ✅ Next.js: 14.2.5 → 14.2.15
- ✅ React: 18 → 18.3.1
- ✅ Prisma: 5.16.0 → 5.22.0
- ✅ Vertex AI: 1.4.0 → 1.7.0
- ✅ TypeScript: 5 → 5.6.3
- ✅ Added `@typescript-eslint` plugins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📜 License

This project is licensed under the MIT License.

## 🔮 Future Features

- 🔍 **Semantic Search**: Vector embeddings for finding similar memories
- 👥 **Multi-user Support**: User accounts and authentication
- 📊 **Emotional Insights**: Timeline of emotional patterns
- 🔗 **Memory Connections**: Link related memories together
- 📱 **Mobile App**: Native iOS/Android with React Native
- 🎨 **Custom Themes**: Multiple postcard styles and color schemes
- 🌐 **Sharing**: Generate shareable postcard links
- 📥 **Export**: Download postcards as PDFs or images
- 🗣️ **Voice Notes**: Add audio recordings to memories
- 📅 **Calendar View**: Browse memories by date

## 🙏 Acknowledgments

- Google Cloud Platform for Vertex AI and Cloud Storage
- Vercel for seamless deployment
- The Next.js team for an amazing framework
- The Prisma team for excellent database tooling

---

**Made with ❤️ using AI and modern web technologies**