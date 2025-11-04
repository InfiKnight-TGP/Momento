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
      className={`
        relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
        ${isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400 bg-white'
        }
      `}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="flex flex-col items-center space-y-4">
        <div className={`
          p-4 rounded-full transition-colors
          ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}
        `}>
          {isDragging ? (
            <Upload className="w-8 h-8 text-blue-500" />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-400" />
          )}
        </div>

        <div>
          <p className="text-lg font-medium text-gray-700">
            {isDragging ? 'Drop your photo here' : 'Upload a photo'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Drag and drop or click to browse
          </p>
        </div>

        <div className="text-xs text-gray-400">
          Supports: JPG, PNG, GIF, WebP (max 10MB)
        </div>
      </div>
    </div>
  )
}