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

    if (story.length < 50) {
      return NextResponse.json(
        { error: 'Story must be at least 50 characters' },
        { status: 400 }
      )
    }

    // Upload image
    const imageUrl = await uploadImage(image)
    console.log('Image uploaded:', imageUrl)

    // Get AI insights (title + description + tags)
    const insights = await analyzeMemory(imageUrl, story)
    console.log('AI insights:', insights)

    // Save to database WITH title and description
    const memory = await prisma.memory.create({
      data: {
        imageUrl,
        story,
        title: insights.title || 'Untitled Memory',
        description: insights.description || 'A special moment.',
        emotions: JSON.stringify(insights.emotions || []),
        people: JSON.stringify(insights.people || []),
        themes: JSON.stringify(insights.themes || []),
        locations: JSON.stringify(insights.locations || []),
        events: JSON.stringify(insights.events || []),
        keywords: insights.keywords?.join(', ') || null,
      },
    })

    console.log('Memory created:', memory)
    return NextResponse.json({ success: true, memory })
  } catch (error) {
    console.error('Memory creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create memory' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 20

    const [memories, total] = await Promise.all([
      prisma.memory.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.memory.count(),
    ])

    return NextResponse.json({
      success: true,
      memories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Memories fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch memories' },
      { status: 500 }
    )
  }
}
