'use client'

import { useEffect, useState } from 'react'
import PostcardCard from '@/components/PostcardCard'
import AddMemoryModal from '@/components/AddMemoryModal'
import BookmarkButton from '@/components/BookmarkButton'
import { Sparkles, BookOpen, Brain } from 'lucide-react'

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

const getRandomRotation = (id: string) => {
  const seed = id.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
  const angle = (seed % 20) - 10
  const tilt = (seed % 2) === 0 ? -2 : 2
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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your memories...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-4 md:p-8 pt-24 md:pt-32">
        {/* Hero Header */}
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6 border border-purple-100">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">AI-Powered Memory Journal</span>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <BookOpen className="w-12 h-12 text-purple-600" />
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              Momento
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
            Transform your photos into <span className="font-semibold text-purple-700">poetic memories</span> with AI-generated stories
          </p>
          
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Powered by Gemini AI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm text-gray-600">{memories.length} memories captured</span>
            </div>
          </div>
        </div>

        {/* Scrapbook Grid */}
        <div className="max-w-7xl mx-auto">
          {memories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {memories.map((memory) => {
                const { angle, tilt } = getRandomRotation(memory.id)
                return (
                  <div
                    key={memory.id}
                    className="perspective transition-all duration-300 hover:scale-105 hover:z-10"
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
              <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-12 max-w-2xl mx-auto border border-purple-100">
                <BookOpen className="w-20 h-20 text-purple-300 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Your Story Begins Here</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Create your first AI-enhanced memory and watch it come to life as a beautiful postcard
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  Create First Memory ✨
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bookmark Button */}
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
