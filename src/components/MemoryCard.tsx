'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

interface MemoryCardProps {
  memory: {
    id: string
    imageUrl: string
    title: string
    description: string
    story: string
    emotions: string
    themes: string
    locations: string
    createdAt: string
  }
}

export default function MemoryCard({ memory }: MemoryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const formattedDate = new Date(memory.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  // Parse comma-separated strings into arrays and remove brackets
  const parseAndClean = (str: string) => {
    if (!str) return []
    // Remove square brackets and quotes, then split and clean
    return str
      .replace(/[\[\]"]/g, '') // Remove [, ], and "
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)
  }

  const emotions = parseAndClean(memory.emotions)
  const themes = parseAndClean(memory.themes)
  const locations = parseAndClean(memory.locations)

  // Combine emotions and themes for top tags
  const topTags = [...emotions, ...themes].slice(0, 2)

  return (
    <div 
      className="relative w-[420px] h-[560px] cursor-pointer"
      style={{ perspective: '1500px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
        style={{ 
          transformStyle: 'preserve-3d',
          transformOrigin: 'center'
        }}
      >
        {/* Card Front - Magazine Style with Image */}
        <div
          className="absolute w-full h-full rounded-3xl shadow-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Background Image with Overlay */}
          <div className="relative w-full h-full">
            <Image
              src={memory.imageUrl}
              alt={memory.title}
              fill
              className="object-cover"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70"></div>
          </div>

          {/* Top Tags */}
          <div className="absolute top-8 left-8 flex gap-3 z-10">
            {topTags.map((tag, index) => (
              <span
                key={index}
                className="px-5 py-2 bg-blue-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
            <h2 className="text-white text-4xl font-bold mb-4 leading-tight">
              {memory.title}
            </h2>
            <p className="text-white/90 text-base flex items-center gap-2">
              Click to read the story <span className="text-xl">→</span>
            </p>
          </div>
        </div>

        {/* Card Back - Story Card */}
        <div
          className="absolute w-full h-full rounded-3xl shadow-2xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #FFF8E7 0%, #F5E6D3 100%)'
          }}
        >
          <div className="h-full p-12 flex flex-col">
            {/* Quote Section - AI Generated Story */}
            <div className="mb-6 pb-6 border-b-2 border-amber-700/20">
              <p className="text-gray-800 text-base italic leading-relaxed font-serif line-clamp-4">
                "{memory.story || memory.description}"
              </p>
            </div>

            {/* User Input Description */}
            <div className="mb-6 flex-shrink-0">
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                {memory.description}
              </p>
            </div>

            {/* Bottom Section - Category and Date */}
            <div className="mt-auto space-y-4">
              {/* Category Tags */}
              {locations.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  <span className="text-gray-700 font-medium text-sm">
                    {locations.join(', ')}
                  </span>
                </div>
              )}

              {/* Theme Pills */}
              {themes.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {themes.map((theme, index) => (
                    <span
                      key={index}
                      className="px-4 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              )}

              {/* Date */}
              <div className="text-gray-600 text-base">
                {formattedDate}
              </div>

              {/* Flip Back Text */}
              <div className="text-gray-500 text-sm flex items-center gap-2 pt-2">
                <span className="text-lg">←</span> Click to flip back
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
