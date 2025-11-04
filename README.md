# Photo Journal

A digital photo journal where users combine images with personal storytelling. The system uses artificial intelligence to understand both the visual content AND the personal narrative together, extracting deep contextual meaning about what moments represent.

## Features

- 📸 **Photo Upload**: Drag-and-drop interface for uploading photos
- ✍️ **Natural Storytelling**: Write about your memories conversationally, like texting a friend
- 🤖 **AI Analysis**: Gemini Pro Vision analyzes photos and stories to extract:
  - Emotions and feelings
  - People and relationships
  - Life themes and patterns
  - Locations and events
- 📚 **Memory Gallery**: Browse all your memories with AI insights displayed
- 📱 **Mobile Responsive**: Works beautifully on all devices
- ☁️ **Cloud Storage**: Photos stored securely in Google Cloud Storage

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **AI**: Google Vertex AI with Gemini Pro Vision
- **Storage**: Google Cloud Storage
- **Database**: PostgreSQL (with Prisma)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- Google Cloud Project with the following APIs enabled:
  - Vertex AI API
  - Cloud Storage API
  - Cloud SQL Admin API

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd photo-journal
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/photojournal"

# Google Cloud
GOOGLE_CLOUD_PROJECT="your-project-id"
GOOGLE_CLOUD_STORAGE_BUCKET="your-bucket-name"

# Google Vertex AI
GOOGLE_VERTEX_AI_LOCATION="us-central1"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

4. Set up the database
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/
│   ├── api/memories/       # API routes for memory CRUD
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── CreateMemory.tsx    # Memory creation form
│   ├── MemoryGallery.tsx   # Display all memories
│   ├── PhotoUpload.tsx     # Photo upload component
│   └── StoryInput.tsx      # Story text input
├── lib/
│   ├── ai.ts              # Gemini AI integration
│   ├── db.ts              # Prisma client
│   └── storage.ts         # Cloud Storage integration
└── types/
    └── memory.ts          # TypeScript definitions
```

## How It Works

1. **Upload Photo**: Users drag and drop or select a photo
2. **Tell Story**: Write naturally about what happened, how they felt, who was there
3. **AI Analysis**: Gemini Pro Vision analyzes both the image and story together to extract:
   - Emotional context and feelings
   - People mentioned and their relationships
   - Life themes (family, health, nature, celebrations)
   - Locations and events
4. **Memory Creation**: The photo, story, and AI insights are saved to the database
5. **Gallery View**: All memories are displayed in a responsive grid with AI insights

## AI Integration

The application uses Google's Gemini Pro Vision model to analyze multimodal content (images + text). The AI is prompted to extract structured information about:

- **Emotions**: How the user felt (peaceful, grateful, concerned, etc.)
- **People**: Who's mentioned and their relationships
- **Themes**: Life patterns and topics (family, health, nature, milestones)
- **Locations**: Places mentioned or detected
- **Events**: What occurred (conversations, celebrations, trips)

The AI understands conversational, natural language descriptions and learns from user patterns over time.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

The application is configured for zero-config deployment on Vercel with the included `vercel.json`.

### Environment Variables for Production

- `DATABASE_URL`: PostgreSQL connection string
- `GOOGLE_CLOUD_PROJECT`: Your Google Cloud project ID
- `GOOGLE_CLOUD_STORAGE_BUCKET`: Cloud Storage bucket name
- `GOOGLE_VERTEX_AI_LOCATION`: Vertex AI region (e.g., "us-central1")

## Database Schema

The application uses a single `Memory` model with the following structure:

```prisma
model Memory {
  id          String   @id @default(cuid())
  imageUrl    String   // Cloud Storage URL
  story       String   // User's personal narrative
  createdAt   DateTime @default(now())

  // AI-extracted insights (JSON fields)
  emotions    Json?    // ["peaceful", "grateful", "concerned"]
  people      Json?    // [{"name": "sister", "relationship": "family"}]
  themes      Json?    // ["family", "health", "nature"]
  locations   Json?    // ["beach", "favorite places"]
  events      Json?    // ["difficult conversation", "milestone"]

  // Search and discovery
  keywords    String?  // Comma-separated for simple search
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Features

- 🔍 Semantic search across memories
- 👥 User accounts and authentication
- 📊 Emotional insights and patterns
- 🔗 Memory linking and relationships
- 📱 Mobile app (React Native)
- 🎨 Memory customization and themes