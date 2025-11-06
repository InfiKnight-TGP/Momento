'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, MapPin, Calendar, Sparkles } from 'lucide-react'

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
  const [isExpanded, setIsExpanded] = useState(false)

  let emotions = []
  let locations = []

  try {
    emotions = JSON.parse(memory.emotions || '[]')
    locations = JSON.parse(memory.locations || '[]')
  } catch (e) {}

  return (
    <>
      {/* Card in Journal */}
      <motion.div
        whileHover={{
          scale: 1.02,
          y: -5,
          rotateZ: Math.random() * 2 - 1,
          transition: { duration: 0.3 }
        }}
        onClick={() => setIsExpanded(true)}
        className="relative cursor-pointer group"
      >
        {/* Polaroid-style photo */}
        <div className="bg-white p-3 shadow-xl rounded-sm transform rotate-[-1deg] group-hover:rotate-0 transition-all duration-300">
          {/* Photo */}
          <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
            <Image
              src={memory.imageUrl}
              alt={memory.title}
              fill
              className="object-cover"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <p className="text-white text-sm font-medium flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Click to read
              </p>
            </div>
          </div>

          {/* Caption area */}
          <div className="mt-3 text-center">
            <p className="text-sm font-handwriting text-gray-800 line-clamp-1">
              {memory.title}
            </p>
            {emotions.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {emotions.slice(0, 2).join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* Tape pieces for authentic scrapbook feel */}
        <div className="absolute -top-2 left-8 w-16 h-6 bg-amber-100/60 backdrop-blur-sm rotate-[-5deg] shadow-sm"></div>
        <div className="absolute -top-2 right-8 w-16 h-6 bg-amber-100/60 backdrop-blur-sm rotate-[5deg] shadow-sm"></div>
      </motion.div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, rotateY: -20 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.9, rotateY: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-amber-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
            >
              {/* Close button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 bg-white hover:bg-gray-100 p-2 rounded-full shadow-lg transition-colors z-10"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              {/* Content */}
              <div className="space-y-6">
                {/* Large photo */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src={memory.imageUrl}
                    alt={memory.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Title */}
                <h2 className="text-3xl font-serif font-bold text-amber-900">
                  {memory.title}
                </h2>

                {/* AI Description */}
                <div className="bg-white/50 rounded-lg p-6 border-2 border-amber-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-800">AI-Generated Story</span>
                  </div>
                  <p className="text-gray-800 italic leading-relaxed font-serif">
                    "{memory.description}"
                  </p>
                </div>

                {/* Original Story */}
                <div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Your Story</h3>
                  <p className="text-gray-700 leading-relaxed">{memory.story}</p>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {locations.length > 0 && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>{locations.join(', ')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>
                      {new Date(memory.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Emotion tags */}
                {emotions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {emotions.map((emotion: string, i: number) => (
                      <span
                        key={i}
                        className="bg-amber-200 text-amber-900 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {emotion}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
