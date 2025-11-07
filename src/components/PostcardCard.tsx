'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Clock, Sparkles } from 'lucide-react'

interface PostcardCardProps {
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

export default function PostcardCard({ memory }: PostcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  let emotions = []
  let themes = []
  let locations = []

  try {
    emotions = JSON.parse(memory.emotions || '[]')
    themes = JSON.parse(memory.themes || '[]')
    locations = JSON.parse(memory.locations || '[]')
  } catch (e) {}

  return (
    <div
      className="h-96 cursor-pointer perspective group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* 3D Flip Container */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white group-hover:shadow-3xl transition-shadow"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Image */}
          <div className="relative w-full h-full">
            <Image
              src={memory.imageUrl}
              alt={memory.title}
              fill
              className="object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Top Tags */}
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap max-w-[80%]">
              {emotions.slice(0, 2).map((emotion: string, i: number) => (
                <span
                  key={i}
                  className="bg-white/90 backdrop-blur-sm text-purple-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-purple-100"
                >
                  ✨ {emotion}
                </span>
              ))}
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 drop-shadow-lg leading-tight">
                {memory.title || 'Untitled Memory'}
              </h2>
              
              {locations.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-medium">{locations[0]}</span>
                </div>
              )}
              
              <p className="text-sm text-white/90 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                Tap to read the full story
              </p>
            </div>
          </div>
        </div>

        {/* BACK SIDE - Vintage Postcard */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-amber-200 p-8 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 30px,
              rgba(139, 92, 46, 0.05) 30px,
              rgba(139, 92, 46, 0.05) 31px
            )`,
          }}
        >
          {/* Vintage Stamp */}
          <div className="absolute top-4 right-4">
            <div className="w-16 h-16 border-2 border-dashed border-amber-400 rounded-sm flex items-center justify-center bg-amber-100">
              <span className="text-2xl">📮</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Title */}
            <h3 className="text-xl font-bold text-amber-900 mb-4 font-serif">
              {memory.title}
            </h3>

            {/* AI Description */}
            <div className="mb-4">
              <p className="text-sm text-gray-700 italic leading-relaxed font-serif">
                "{memory.description || 'A special memory captured in time.'}"
              </p>
            </div>

            {/* Original Story Snippet */}
            {memory.story && (
              <div className="mt-4 pt-4 border-t-2 border-dashed border-amber-300">
                <p className="text-xs text-gray-600 font-sans">
                  {memory.story.substring(0, 120)}...
                </p>
              </div>
            )}
          </div>

          {/* Bottom Metadata */}
          <div className="space-y-3 pt-4 border-t-2 border-amber-300">
            {/* Themes */}
            {themes.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {themes.slice(0, 3).map((theme: string, i: number) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium border border-green-200"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            )}

            {/* Date & Location */}
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>{locations.join(', ') || 'Unknown'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span>
                  {new Date(memory.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Flip Back Hint */}
            <p className="text-center text-xs text-amber-700 pt-2 font-medium">
              ← Tap to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
  