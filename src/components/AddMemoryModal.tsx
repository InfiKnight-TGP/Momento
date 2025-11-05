'use client'

import { useState, FormEvent } from 'react'
import { X } from 'lucide-react'

interface AddMemoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function AddMemoryModal({ isOpen, onClose, onSuccess }: AddMemoryModalProps) {
  const [image, setImage] = useState<File | null>(null)
  const [story, setStory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<string>('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!image || !story.trim()) {
      setError('Please upload a photo and write a story')
      return
    }
    if (story.length < 50) {
      setError('Story must be at least 50 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('story', story)

      const response = await fetch('/api/memories', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setImage(null)
        setStory('')
        setPreview('')
        onSuccess?.()
        onClose()
      } else {
        setError('Failed to create memory')
      }
    } catch (err) {
      setError('Error uploading memory')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create a Memory</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            <X size={28} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Upload a Photo
            </label>
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null)
                    setPreview('')
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition">
                <div className="text-gray-400 text-5xl mb-3">📷</div>
                <p className="text-gray-700 font-medium">Drag and drop or click to browse</p>
                <p className="text-gray-500 text-sm mt-2">JPG, PNG, GIF, WebP (max 10MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Story */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Tell Your Story
            </label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Write naturally about what happened, how you felt, who was there... Like you're texting a friend."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
            />
            <p className="text-sm text-gray-500 mt-2">
              {story.length} characters (minimum 50)
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !image || story.length < 50}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Creating...' : 'Create Memory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
