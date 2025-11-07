'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Plus, Home } from 'lucide-react'
import BookmarkButton from '@/components/BookmarkButton'
import '../styles/journal.css'

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

export default function JournalPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [bookOpened, setBookOpened] = useState(false)

  const CARDS_PER_PAGE = 4

  useEffect(() => {
    loadMemories()
  }, [])

  const loadMemories = async () => {
    try {
      const response = await fetch('/api/memories')
      const data = await response.json()
      setMemories(Array.isArray(data) ? data : data.memories || [])
      setLoading(false)
      setTimeout(() => setBookOpened(true), 300)
    } catch (error) {
      console.error('Failed to load memories:', error)
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(memories.length / CARDS_PER_PAGE)
  const currentMemories = memories.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  )

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-pink-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-300 border-t-orange-700 mx-auto mb-4"></div>
          <p className="text-orange-900 text-lg font-serif">Opening your journal...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen scene-container relative" style={{ background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' }}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-black/10 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-orange-100 transition-colors">
          <Home className="w-6 h-6" />
          <span className="font-serif text-lg">Home</span>
        </Link>
        <h1 className="text-3xl font-serif font-bold text-white drop-shadow-lg">My Journal</h1>
        <Link href="/upload" className="flex items-center gap-2 text-white hover:text-orange-100 transition-colors">
          <Plus className="w-6 h-6" />
          <span className="font-serif">Add Memory</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen pt-24 pb-12 px-4 relative">
        {bookOpened && (
          <div className="book-container w-full max-w-6xl relative">
            {/* Page Container */}
            <div className="flex items-center justify-center gap-8">
              {/* Left Arrow */}
              {currentPage > 0 && (
                <button
                  onClick={prevPage}
                  className="nav-button left-nav"
                  title="Previous page"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
              )}

              {/* Book Pages */}
              <div className="book-pages">
                <div className="pages-grid">
                  {currentMemories.map((memory, index) => (
                    <div key={memory.id} className="memory-page">
                      <MemoryCard memory={memory} pageNumber={currentPage * 4 + index + 1} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              {currentPage < totalPages - 1 && (
                <button
                  onClick={nextPage}
                  className="nav-button right-nav"
                  title="Next page"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              )}
            </div>

            {/* Page Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`page-dot ${i === currentPage ? 'active' : ''}`}
                  title={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            {/* Page Counter */}
            <div className="text-center mt-4 text-orange-900 font-serif text-sm">
              Page {currentPage + 1} of {totalPages || 1}
            </div>

            {/* Bookmark Button - Fixed Position */}
            <div className="fixed right-6 top-32 z-40">
              <BookmarkButton onClick={() => window.location.href = '/upload'} />
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && memories.length === 0 && (
          <div className="text-center">
            <div className="text-6xl mb-4">📖</div>
            <h2 className="text-3xl font-serif text-orange-900 mb-4">Your journal is empty</h2>
            <p className="text-orange-800 text-lg mb-6 font-serif">Start creating memories to fill your beautiful journal</p>
            <Link href="/upload" className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-serif transition-colors">
              Add Your First Memory
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

interface MemoryCardProps {
  memory: Memory
  pageNumber: number
}

function MemoryCard({ memory, pageNumber }: MemoryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  let locations: string[] = []
  try {
    locations = JSON.parse(memory.locations || '[]')
  } catch (e) {}

  return (
    <div className="memory-card-container">
      <div
        className={`memory-card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front */}
        <div className="memory-card-front">
          <div className="tape tape-left"></div>
          <div className="tape tape-right"></div>

          <div className="card-image-wrapper">
            <Image
              src={memory.imageUrl}
              alt={memory.title}
              fill
              className="card-image"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>

          <div className="card-caption">
            <p className="caption-text">{memory.title}</p>
          </div>

          <div className="page-number-front">{pageNumber}</div>
        </div>

        {/* Back */}
        <div className="memory-card-back">
          <div className="back-content">
            <h3 className="back-title">{memory.title}</h3>

            <div className="back-description">
              <p className="description-text">"{memory.description}"</p>
            </div>

            {locations.length > 0 && (
              <div className="back-location">
                <span className="location-icon">📍</span>
                <span className="location-text">{locations[0]}</span>
              </div>
            )}

            <div className="back-date">
              {new Date(memory.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>

            <p className="flip-hint">Tap to flip back</p>
          </div>

          <div className="page-number-back">{pageNumber}</div>
        </div>
      </div>
    </div>
  )
}
