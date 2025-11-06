'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

interface BookmarkButtonProps {
  onClick: () => void
}

export default function BookmarkButton({ onClick }: BookmarkButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group"
      title="Add Memory"
    >
      {/* Bookmark shape */}
      <div className="w-16 h-28 bg-gradient-to-b from-red-600 to-red-700 shadow-xl relative overflow-hidden">
        {/* Notch at bottom */}
        <div className="absolute -bottom-1 left-0 right-0 h-4 bg-red-700" style={{
          clipPath: 'polygon(0 0, 50% 100%, 100% 0)'
        }}></div>

        {/* Gold ribbon detail */}
        <div className="absolute top-2 left-2 right-2 h-1 bg-amber-400"></div>

        {/* Plus icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Plus className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Hover tooltip */}
      <div className="absolute -left-28 top-1/2 -translate-y-1/2 bg-amber-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
        Add New Memory
      </div>
    </motion.button>
  )
}
