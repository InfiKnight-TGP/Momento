'use client'

import { useState } from 'react'
import Image from 'next/image'

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
      className="h-96 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* 3D Flip Container */}
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE - Image with Title */}
        <div
          className="absolute w-full h-full bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Image Background */}
          <div className="relative w-full h-full">
            <Image
              src={memory.imageUrl}
              alt={memory.title}
              fill
              className="object-cover"
            />

            {/* Dark overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              {/* Top - Tags */}
              <div className="flex gap-2 flex-wrap">
                {emotions.slice(0, 2).map((emotion: string, i: number) => (
                  <span
                    key={i}
                    className="bg-blue-500 bg-opacity-80 text-white px-2 py-1 rounded-full text-xs font-semibold"
                  >
                    {emotion}
                  </span>
                ))}
              </div>

              {/* Bottom - Title */}
              <div>
                <h2 className="text-2xl font-bold text-white drop-shadow-lg leading-tight">
                  {memory.title || 'Untitled Memory'}
                </h2>
                <p className="text-sm text-gray-200 mt-2 drop-shadow">
                  Click to read the story →
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE - Postcard Note */}
        <div
          className="absolute w-full h-full bg-amber-50 rounded-lg shadow-lg overflow-hidden border-2 border-amber-200 p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Postcard lines effect */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <svg width="100%" height="100%" className="w-full h-full">
              <defs>
                <pattern id="lines" x="0" y="24" width="100%" height="24" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="black" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#lines)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Description - Handwritten style */}
            <p className="text-gray-800 text-sm leading-relaxed font-serif italic">
              "{memory.description || 'A special memory.'}"
            </p>

            {/* Original Story */}
            {memory.story && (
              <p className="text-gray-700 text-xs mt-4 pt-4 border-t border-gray-300 font-sans">
                {memory.story.substring(0, 150)}...
              </p>
            )}
          </div>

          {/* Bottom section - Metadata */}
          <div className="relative z-10 pt-4 border-t border-amber-300">
            {/* Locations */}
            {locations.length > 0 && (
              <p className="text-gray-700 text-xs font-semibold mb-2">
                📍 {locations.join(', ')}
              </p>
            )}

            {/* Themes */}
            {themes.length > 0 && (
              <div className="flex gap-1 flex-wrap mb-2">
                {themes.slice(0, 2).map((theme: string, i: number) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            )}

            {/* Date */}
            <p className="text-gray-600 text-xs">
              {new Date(memory.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>

            {/* Flip hint */}
            <p className="text-gray-500 text-xs mt-2 italic">
              ← Click to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}