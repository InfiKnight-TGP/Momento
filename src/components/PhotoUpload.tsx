'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface PhotoUploadProps {
  onImageSelect: (file: File) => void
  selectedImage?: File
  onImageRemove: () => void
}

export default function PhotoUpload({ onImageSelect, selectedImage, onImageRemove }: PhotoUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))

    if (imageFile) {
      onImageSelect(imageFile)
    }
  }, [onImageSelect])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file)
    }
  }, [onImageSelect])

  if (selectedImage) {
    return (
      <div className="relative">
        <div className="relative rounded-lg overflow-hidden bg-gray-100">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onImageRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600 text-center">
          {selectedImage.name}
        </p>
      </div>
    )
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`group relative flex flex-col items-center justify-center w-full h-64 border-4 border-dashed rounded-2xl cursor-pointer transition-all duration-300 shadow-lg ${
        isDragging
          ? 'border-purple-600 bg-purple-100 scale-[1.02] shadow-2xl'
          : 'border-purple-300 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 hover:border-purple-500 hover:shadow-xl'
      }`}
    >
      <div className="flex flex-col items-center justify-center p-8">
        <div className={`mb-6 p-5 rounded-full transition-all duration-300 ${
          isDragging 
            ? 'bg-purple-600 scale-110' 
            : 'bg-purple-200 group-hover:bg-purple-300 group-hover:scale-110'
        }`}>
          {isDragging ? (
            <Upload size={40} className="text-white animate-bounce" />
          ) : (
            <ImageIcon size={40} className="text-purple-600 group-hover:text-purple-700" />
          )}
        </div>
        <p className="mb-2 text-xl font-bold text-gray-800">
          {isDragging ? '📤 Release to upload' : '📸 Drop your photo here'}
        </p>
        <p className="text-base text-gray-600 font-medium mb-3">or click to browse</p>
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-white/50 px-4 py-2 rounded-full">
          <span>✓ JPG, PNG, GIF, WebP</span>
          <span className="text-gray-300">•</span>
          <span>Max 10MB</span>
        </div>
      </div>
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileSelect}
      />
    </div>
  )
}