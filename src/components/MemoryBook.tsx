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

export default function MemoryBook({ userName }: { userName: string }) {
  const [memories, setMemories] = useState<Memory[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pageDirection, setPageDirection] = useState(1)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const MEMORIES_PER_SPREAD = 4 // 4 pages in view (2 left + 2 right)

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
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-rose-100 via-peach-100 to-amber-100">
        <div className="text-amber-800 text-2xl font-serif">Opening your journal...</div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-peach-100 to-amber-100 overflow-hidden">
      {/* Paper texture */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')]"></div>

      {/* Book Container */}
      <div className="relative w-full max-w-[95vw] h-[90vh] flex items-center justify-center perspective-[2000px]">
        {/* Left Navigation */}
        {currentPage > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1, x: -5 }}
            onClick={prevPage}
            className="absolute left-2 z-20 bg-amber-800 hover:bg-amber-900 text-white p-3 md:p-4 rounded-full shadow-xl"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>
        )}

        {/* Book Pages */}
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait" custom={pageDirection}>
            <motion.div
              key={currentPage}
              custom={pageDirection}
              initial={{ rotateY: pageDirection === 1 ? -90 : 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: pageDirection === 1 ? 90 : -90, opacity: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-full h-full"
            >
              {/* Four-Page Spread */}
              <div className="relative w-full h-full grid grid-cols-2 gap-2 md:gap-4 p-4 md:p-8">
                {/* Page 1 (Top Left) */}
                <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg shadow-2xl p-4 md:p-6 border-r border-b border-amber-200 overflow-hidden">
                  {/* Page lines */}
                  <div className="absolute inset-0 pointer-events-none opacity-5" style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, rgba(139, 92, 46, 0.3) 29px, rgba(139, 92, 46, 0.3) 30px)'
                  }}></div>

                  {/* Doodles - Top Left */}
                  <DoodleElements position="top-left" />

                  {/* Memory */}
                  {currentMemories[0] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="relative z-10 h-full flex items-center justify-center"
                    >
                      <MemoryCard memory={currentMemories[0]} />
                    </motion.div>
                  )}

                  {/* Page number */}
                  <div className="absolute bottom-3 right-3 text-amber-600 text-xs md:text-sm font-serif">
                    {currentPage * 4 + 1}
                  </div>
                </div>

                {/* Page 2 (Top Right) */}
                <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg shadow-2xl p-4 md:p-6 border-l border-b border-amber-200 overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none opacity-5" style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 29px, rgba(139, 92, 46, 0.3) 29px, rgba(139, 92, 46, 0.3) 30px)'
                  }}></div>

                  {/* Doodles - Top Right */}
                  <DoodleElements position="top-right" />

                  {currentMemories[1] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.6 }}
                      className="relative z-10 h-full flex items-center justify-center"
