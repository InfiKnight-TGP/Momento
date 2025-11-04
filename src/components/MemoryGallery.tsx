'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Heart, MapPin, Users, Calendar, Tag } from 'lucide-react'
import { Memory } from '@/types/memory'

export default function MemoryGallery() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchMemories = async () => {
    try {
      const response = await fetch('/api/memories')
      const data = await response.json()
      if (data.success) {
        setMemories(data.memories)
      }
    } catch (error) {
      console.error('Failed to fetch memories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMemories()
  }, [])

  const refreshMemories = () => {
    setIsLoading(true)
    fetchMemories()
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (memories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-4">
          No memories yet. Create your first memory above!
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {memories.map((memory) => (
        <div key={memory.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image
              src={memory.imageUrl}
              alt="Memory"
              fill
              className="object-cover"
            />
          </div>

          <div className="p-4">
            <p className="text-gray-800 text-sm mb-4 line-clamp-3">
              {memory.story}
            </p>

            <div className="flex items-center text-gray-500 text-xs mb-3">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(memory.createdAt).toLocaleDateString()}
            </div>

            {/* AI Insights */}
            <div className="space-y-2">
              {memory.emotions && Array.isArray(memory.emotions) && memory.emotions.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Heart className="w-3 h-3 text-red-500" />
                  <div className="flex flex-wrap gap-1">
                    {memory.emotions.slice(0, 3).map((emotion, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-full"
                      >
                        {emotion}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {memory.people && Array.isArray(memory.people) && memory.people.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Users className="w-3 h-3 text-blue-500" />
                  <div className="flex flex-wrap gap-1">
                    {memory.people.slice(0, 2).map((person: any, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                      >
                        {person.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {memory.locations && Array.isArray(memory.locations) && memory.locations.length > 0 && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3 h-3 text-green-500" />
                  <div className="flex flex-wrap gap-1">
                    {memory.locations.slice(0, 2).map((location, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-full"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {memory.themes && Array.isArray(memory.themes) && memory.themes.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Tag className="w-3 h-3 text-purple-500" />
                  <div className="flex flex-wrap gap-1">
                    {memory.themes.slice(0, 2).map((theme, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}