'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MemoryCard from '@/components/MemoryCard'
import BookmarkButton from '@/components/BookmarkButton'
import AddMemoryModal from '@/components/AddMemoryModal'

interface Memory {
  id: string
  imageUrl: string
  story: string
  title: string
  description: string
  createdAt: string
  emotions: string
  themes: string
  locations: string
}

interface MemoryBookProps {
  userName: string
}

export default function MemoryBook({ userName }: MemoryBookProps) {
  const [memories, setMemories] = useState<Memory[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pageDirection, setPageDirection] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const MEMORIES_PER_SPREAD = 4

  useEffect(() => {
    loadMemories()
  }, [])

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

  const totalPages = Math.ceil(memories.length / MEMORIES_PER_SPREAD)
  const currentMemories = memories.slice(
    currentPage * MEMORIES_PER_SPREAD,
    (currentPage + 1) * MEMORIES_PER_SPREAD
  )

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setPageDirection(1)
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setPageDirection(-1)
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading) {
    return null
  }

  const craftPaperBg = {
    background: 'linear-gradient(135deg, #d4a574 0%, #c9954d 50%, #b8865e 100%)'
  }

  return (
    <div 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={craftPaperBg}
    >
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 opacity-30">
        <div className="w-12 h-12 border-4 border-dashed border-amber-800 rounded-lg rotate-12"></div>
      </div>
      <div className="absolute top-12 right-12 opacity-30">
        <svg className="w-16 h-16 text-amber-800" viewBox="0 0 50 50">
          <path d="M25 5 L30 20 L45 20 L35 30 L40 45 L25 35 L10 45 L15 30 L5 20 L20 20 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Main container */}
      <div className="relative w-full max-w-7xl h-[85vh] flex items-center justify-center px-4">
        {/* Left arrow */}
        {currentPage > 0 && (
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            onClick={prevPage}
            className="absolute left-4 z-20 bg-amber-900 hover:bg-amber-950 text-white p-4 rounded-full shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
        )}

        {/* Pages grid */}
        <AnimatePresence mode="wait" custom={pageDirection}>
          <motion.div
            key={currentPage}
            custom={pageDirection}
            initial={{ rotateY: pageDirection === 1 ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: pageDirection === 1 ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="w-full h-full grid grid-cols-2 grid-rows-2 gap-6 p-8"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {currentMemories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="relative"
              >
                <MemoryCard memory={memory} />
                
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <span className="text-sm font-handwriting text-amber-900">
                    {currentPage * 4 + index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Right arrow */}
        {currentPage < totalPages - 1 && (
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            onClick={nextPage}
            className="absolute right-4 z-20 bg-amber-900 hover:bg-amber-950 text-white p-4 rounded-full shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        )}

        {/* Bookmark */}
        <div className="absolute -right-6 top-0 z-30">
          <BookmarkButton onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/* Page dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`rounded-full transition-all ${
              i === currentPage 
                ? 'bg-amber-900 w-8 h-3' 
                : 'bg-amber-700 w-3 h-3 hover:bg-amber-800'
            }`}
          />
        ))}
      </div>

      <AddMemoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          loadMemories()
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}
