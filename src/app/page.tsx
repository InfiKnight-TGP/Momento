'use client'

import { useEffect, useState } from 'react'
import PostcardCard from '@/components/PostcardCard'
import AddMemoryModal from '@/components/AddMemoryModal'
import BookmarkButton from '@/components/BookmarkButton'

interface Memory {
  id: string
  imageUrl: string
  story: string
  title: string
  description: string
  createdAt: string
  emotions: string
  people: string
  themes: string
  locations: string
  events: string
}

// Generate random rotation angles for sticky note effect
const getRandomRotation = (id: string) => {
  // Use ID as seed for consistent rotation per card
  const seed = id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  const angle = (seed % 20) - 10 // -10 to +10 degrees
  const tilt = (seed % 2) === 0 ? -2 : 2 // slight tilt
  return { angle, tilt }
}

export default function Home() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const loadMemories = async () => {
    try {
      const response = await fetch('/api/memories')
      const data = await response.json()
      setMemories(data.memories || data)
    } catch (error) {
      console.error('Failed to load memories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMemories()
  }, [])

  const handleMemoryCreated = () => {
    loadMemories()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading your scrapbook...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 p-4 md:p-8 pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-5xl">📖</span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Momento
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl">
          Your moments, reimagined by AI. Click any postcard to flip and read the story.
        </p>
      </div>

      {/* Scrapbook Grid - Random rotations like sticky notes */}
      <div className="max-w-7xl mx-auto">
        {memories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memories.map((memory) => {
              const { angle, tilt } = getRandomRotation(memory.id)
              return (
                <div
                  key={memory.id}
                  className="perspective transition-transform hover:scale-105 hover:shadow-2xl"
                  style={{
                    transform: `rotate(${angle}deg) skewY(${tilt}deg)`,
                  }}
                >
                  <PostcardCard memory={memory} />
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 mb-4">
              Your scrapbook is empty. Add your first memory! ✨
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Create First Memory
            </button>
          </div>
        )}
      </div>

      {/* Bookmark Button */}
      <BookmarkButton onClick={() => setIsModalOpen(true)} />

      {/* Add Memory Modal */}
      <AddMemoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleMemoryCreated}
      />
    </main>
  )
}
