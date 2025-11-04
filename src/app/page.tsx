'use client'

import { useState } from 'react'
import CreateMemory from '@/components/CreateMemory'
import MemoryGallery from '@/components/MemoryGallery'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleMemoryCreated = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Photo Journal
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Combine your photos with personal stories. Let AI help you discover the deeper meaning behind your memories.
          </p>
        </div>

        <div className="space-y-12">
          <CreateMemory onMemoryCreated={handleMemoryCreated} />

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Your Memories
            </h2>
            <MemoryGallery key={refreshKey} />
          </div>
        </div>
      </div>
    </main>
  )
}