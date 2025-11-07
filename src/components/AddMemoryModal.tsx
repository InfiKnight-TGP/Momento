'use client'

import { useState, FormEvent } from 'react'
import { X, Upload, Sparkles, Image as ImageIcon } from 'lucide-react'

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
      setError('Please upload a photo and write your story')
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto my-8 border-4 border-purple-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative overflow-hidden sticky top-0 z-10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Create a Momento</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-full transition"
            >
              <X size={28} />
            </button>
          </div>
          <p className="mt-2 text-purple-100 relative">Let AI transform your photo into a beautiful memory</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-600" />
              Upload Your Photo
            </label>
            {preview ? (
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border-4 border-purple-200 shadow-lg">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null)
                    setPreview('')
                  }}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3 text-sm font-medium">
                  ✓ Image selected
                </div>
              </div>
            ) : (
              <label className="group relative flex flex-col items-center justify-center w-full h-64 border-4 border-dashed border-purple-300 rounded-2xl cursor-pointer transition-all duration-300 shadow-lg hover:border-purple-500 hover:shadow-xl bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="mb-6 p-5 bg-purple-200 rounded-full transition-all duration-300 group-hover:bg-purple-300 group-hover:scale-110">
                    <Upload size={40} className="text-purple-600 group-hover:text-purple-700" />
                  </div>
                  <p className="mb-2 text-xl font-bold text-gray-800">📸 Drop your photo here</p>
                  <p className="text-base text-gray-600 font-medium mb-3">or click to browse</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/50 px-4 py-2 rounded-full">
                    <span>✓ JPG, PNG, GIF, WebP</span>
                    <span className="text-gray-300">•</span>
                    <span>Max 10MB</span>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Story Input */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Tell Your Story
            </label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Write naturally about what happened, how you felt, who was there... Like you're texting a friend. ✨"
              className="w-full h-40 p-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 resize-none text-gray-900 placeholder-gray-400"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-600">
                {story.length} / 50 characters minimum
              </p>
              {story.length >= 50 && (
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Ready to create!
                </span>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !image || story.length < 50}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Creating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Create Memory
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
