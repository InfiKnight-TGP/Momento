'use client'

import { useState } from 'react'
import PhotoUpload from './PhotoUpload'
import StoryInput from './StoryInput'
import { MemoryFormData } from '@/types/memory'

interface CreateMemoryProps {
  onMemoryCreated: () => void
}

export default function CreateMemory({ onMemoryCreated }: CreateMemoryProps) {
  const [selectedImage, setSelectedImage] = useState<File>()
  const [story, setStory] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
  }

  const handleImageRemove = () => {
    setSelectedImage(undefined)
  }

  const handleSubmit = async () => {
    if (!selectedImage || !story.trim()) return

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', selectedImage)
      formData.append('story', story)

      const response = await fetch('/api/memories', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        // Reset form
        setSelectedImage(undefined)
        setStory('')
        onMemoryCreated()
      } else {
        const error = await response.json()
        console.error('Failed to create memory:', error.error)
      }
    } catch (error) {
      console.error('Error creating memory:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Create a Memory
      </h2>

      <div className="space-y-6">
        <PhotoUpload
          onImageSelect={handleImageSelect}
          selectedImage={selectedImage}
          onImageRemove={handleImageRemove}
        />

        <StoryInput
          story={story}
          onStoryChange={setStory}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}