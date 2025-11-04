import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { uploadImage } from '@/lib/storage'
import { analyzeMemory } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File
    const story = formData.get('story') as string

    if (!image || !story) {
      return NextResponse.json(
        { error: 'Image and story are required' },
        { status: 400 }
      )
    }

    // Upload image to Cloud Storage
    const imageUrl = await uploadImage(image)

    // Analyze with AI
    const insights = await analyzeMemory(imageUrl, story)

    // Save to database
    const memory = await prisma.memory.create({
      data: {
        imageUrl,
        story,
        emotions: insights.emotions,
        people: insights.people,
        themes: insights.themes,
        locations: insights.locations,
        events: insights.events,
        keywords: insights.keywords.join(', '),
      },
    })

    return NextResponse.json({ success: true, memory })
  } catch (error) {
    console.error('Memory creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create memory' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const memories = await prisma.memory.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, memories })
  } catch (error) {
    console.error('Memories fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch memories' },
      { status: 500 }
    )
  }
}