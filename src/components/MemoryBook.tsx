'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import MemoryCard from './MemoryCard'
import AddMemoryModal from './AddMemoryModal'

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
  const [currentPage, setCurrentPage] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [turningDirection, setTurningDirection] = useState<'next' | 'prev' | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const CARDS_PER_PAGE = 2 // Now showing 1 postcard per page side (2 per spread)

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

  const totalPages = Math.ceil(memories.length / CARDS_PER_PAGE)

  const getPageMemories = (page: number) => {
    const startIndex = (page - 1) * CARDS_PER_PAGE
    return memories.slice(startIndex, startIndex + CARDS_PER_PAGE)
  }

  const currentMemories = getPageMemories(currentPage)
  const leftMemories = currentMemories // Show all memories for positioning

  const turnToNextPage = () => {
    if (isAnimating || currentPage >= totalPages) return
    setIsAnimating(true)
    setTurningDirection('next')

    setTimeout(() => {
      setCurrentPage(currentPage + 1)
      setTurningDirection(null)
      setIsAnimating(false)
    }, 1200)
  }

  const turnToPrevPage = () => {
    if (isAnimating || currentPage <= 1) return
    setIsAnimating(true)
    setTurningDirection('prev')

    setTimeout(() => {
      setCurrentPage(currentPage - 1)
      setTurningDirection(null)
      setIsAnimating(false)
    }, 1200)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAnimating) {
        if (e.key === 'ArrowLeft') turnToPrevPage()
        if (e.key === 'ArrowRight') turnToNextPage()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isAnimating, currentPage, totalPages])

  if (loading) {
    return null
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#ffecd2] to-[#fcb69f]">
      {/* Open Book Container - Made larger to accommodate postcard-sized cards */}
      <div className="relative w-[1200px] h-[800px] max-w-[95vw] max-h-[90vh]" style={{ perspective: '2500px' }}>
        
        {/* Book Container */}
        <div className="relative w-full h-full bg-[#FFF8DC] rounded-xl shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
          {/* Bookmark with Plus Button - positioned on top of book */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute -top-2 right-20 w-10 h-20 bg-gradient-to-b from-red-600 to-red-700 shadow-lg z-20 cursor-pointer hover:from-red-700 hover:to-red-800 transition-all hover:scale-105 flex items-center justify-center group"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}
            title="Add New Memory"
          >
            <Plus className="w-6 h-6 text-white mt-2 group-hover:rotate-90 transition-transform" />
          </button>
          
          <div className="relative w-full h-full flex" style={{ perspective: '2500px' }}>
            {/* Left Page (Static) */}
            <div 
              className="w-1/2 h-full relative rounded-l-xl overflow-visible"
              style={{
                background: 'linear-gradient(to bottom, #FFFAF0 0%, #FFF8E7 100%)',
                borderRight: '2px solid #D4AF37',
                boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.1)'
              }}
            >
              <div className="relative w-full h-full p-10">
                {/* Doodles */}
                <div className="absolute top-8 left-8 text-2xl opacity-60 animate-float">⭐</div>
                <div className="absolute top-20 right-10 text-2xl opacity-60 animate-float-delayed">💕</div>
                <div 
                  className="absolute bottom-36 left-5 w-36 h-0.5 opacity-40"
                  style={{
                    background: 'repeating-linear-gradient(90deg, #DDA0DD 0px, #DDA0DD 10px, transparent 10px, transparent 15px)',
                    transform: 'rotate(-5deg)'
                  }}
                />

                {/* Left Memory Cards - Now one card per page */}
                {leftMemories.length > 0 && (
                  <div
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotate(-2deg)',
                    }}
                  >
                    <MemoryCard memory={leftMemories[0]} />
                  </div>
                )}
              </div>
            </div>

            {/* Right Page (Static) */}
            <div 
              className="w-1/2 h-full relative rounded-r-xl overflow-visible"
              style={{
                background: 'linear-gradient(to bottom, #FFFAF0 0%, #FFF8E7 100%)',
                boxShadow: 'inset 10px 0 20px rgba(0,0,0,0.1)'
              }}
            >
              <div className="relative w-full h-full p-10">
                {/* Doodles */}
                <div className="absolute top-10 left-10 text-2xl opacity-60 animate-float">🌸</div>
                <div className="absolute bottom-24 right-12 text-2xl opacity-60 animate-float-delayed">✨</div>
                <div 
                  className="absolute top-24 right-5 w-44 h-0.5 opacity-40"
                  style={{
                    background: 'repeating-linear-gradient(90deg, #DDA0DD 0px, #DDA0DD 10px, transparent 10px, transparent 15px)',
                    transform: 'rotate(3deg)'
                  }}
                />

                {/* Right Memory Cards - Now one card per page */}
                {leftMemories.length > 1 && (
                  <div
                    className="absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotate(2deg)',
                    }}
                  >
                    <MemoryCard memory={leftMemories[1]} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Navigation */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-5 z-20">
          <button
            onClick={turnToPrevPage}
            disabled={currentPage === 1 || isAnimating}
            className="w-10 h-10 rounded-full border-2 border-amber-900 bg-[#FFF8DC] text-amber-900 text-2xl flex items-center justify-center transition-all hover:bg-amber-900 hover:text-[#FFF8DC] hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FFF8DC] disabled:hover:text-amber-900 disabled:hover:scale-100"
          >
            ←
          </button>
          <span className="text-base text-amber-900 font-bold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={turnToNextPage}
            disabled={currentPage === totalPages || isAnimating}
            className="w-10 h-10 rounded-full border-2 border-amber-900 bg-[#FFF8DC] text-amber-900 text-2xl flex items-center justify-center transition-all hover:bg-amber-900 hover:text-[#FFF8DC] hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#FFF8DC] disabled:hover:text-amber-900 disabled:hover:scale-100"
          >
            →
          </button>
        </div>
      </div>

      {/* Add Memory Modal */}
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
