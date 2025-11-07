'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MemoryBook from '../components/MemoryBook'

export default function Home() {
  const [bookOpened, setBookOpened] = useState(false)
  const [showCover, setShowCover] = useState(true)
  const [userName] = useState('Dinesh') // You can make this dynamic later

  const handleOpenBook = () => {
    setBookOpened(true)
    setTimeout(() => setShowCover(false), 1500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-100 via-peach-100 to-amber-100 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')]"></div>

      <AnimatePresence mode="wait">
        {showCover && !bookOpened && (
          <motion.div
            key="cover"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ 
              scale: 3, 
              opacity: 0,
              transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Welcome Message */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mb-8"
            >
              <h1 className="text-5xl md:text-6xl font-serif text-amber-900 mb-3">
                Welcome, <span className="font-handwriting text-6xl md:text-7xl text-amber-800">{userName}</span>
              </h1>
              <p className="text-xl md:text-2xl text-amber-700 font-serif italic">
                Let's write something today ✨
              </p>
            </motion.div>

            {/* Book Icon - Clickable */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenBook}
              className="cursor-pointer relative group"
            >
              {/* Book shadow */}
              <div className="absolute inset-0 bg-black/20 blur-xl transform translate-y-6"></div>

              {/* Closed Book */}
              <div className="relative w-64 h-80 md:w-80 md:h-96">
                {/* Book spine (left edge) */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 rounded-l-lg shadow-xl"></div>

                {/* Book cover */}
                <div className="absolute left-6 right-0 top-0 bottom-0 bg-gradient-to-br from-amber-600 via-amber-500 to-orange-500 rounded-r-xl shadow-2xl overflow-hidden">
                  {/* Leather texture */}
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')]"></div>

                  {/* Embossed border */}
                  <div className="absolute inset-6 border-2 border-amber-700/30 rounded-lg"></div>

                  {/* Title on cover */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <svg className="w-20 h-20 md:w-24 md:h-24 text-amber-900 mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                    </svg>
                    
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 text-center drop-shadow-lg">
                      Momento
                    </h2>
                    <p className="text-sm md:text-base text-amber-800 mt-3 font-serif italic">
                      My Journal
                    </p>
                  </div>

                  {/* Page edges effect */}
                  <div className="absolute right-0 top-4 bottom-4 w-4 bg-gradient-to-r from-white/60 to-amber-50 shadow-inner"></div>
                  <div className="absolute right-1 top-5 bottom-5 w-1 bg-amber-200"></div>
                  <div className="absolute right-2 top-6 bottom-6 w-0.5 bg-amber-300"></div>
                </div>

                {/* Red bookmark ribbon */}
                <div className="absolute right-6 -top-2 w-6 h-32 bg-gradient-to-b from-red-600 to-red-700 shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)' }}></div>
              </div>

              {/* Click instruction */}
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center mt-8 text-amber-800 text-lg font-serif group-hover:text-amber-900"
              >
                Click to open
              </motion.p>
            </motion.div>
          </motion.div>
        )}

        {bookOpened && (
          <motion.div
            key="book"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="w-full h-full"
          >
            <MemoryBook userName={userName} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
