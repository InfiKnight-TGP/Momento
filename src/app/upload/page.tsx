'use client'

import Link from 'next/link'
import { BookOpen, Plus, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-rose-100 to-pink-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative elements - Top Left */}
      <div className="absolute top-10 left-10 opacity-20">
        <div className="w-20 h-20 border-4 border-dashed border-orange-600 rounded-lg rotate-12"></div>
      </div>

      {/* Decorative elements - Bottom Right */}
      <div className="absolute bottom-20 right-10 opacity-20">
        <svg className="w-24 h-24 text-orange-600" viewBox="0 0 50 50">
          <path 
            d="M25 5 L30 20 L45 20 L35 30 L40 45 L25 35 L10 45 L15 30 L5 20 L20 20 Z" 
            fill="currentColor" 
          />
        </svg>
      </div>

      {/* Decorative elements - Top Right */}
      <div className="absolute top-20 right-16 opacity-15">
        <div className="w-32 h-32 border-4 border-dotted border-rose-500 rounded-full"></div>
      </div>

      {/* Main content container */}
      <div className="text-center max-w-3xl mx-auto z-10">
        {/* Logo/Icon */}
        <div className="mb-8 inline-block animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="bg-white rounded-full p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
            <BookOpen className="w-20 h-20 text-orange-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Main Title */}
        <h1 
          className="text-6xl md:text-7xl font-bold text-orange-900 mb-4 drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
          style={{ fontFamily: 'Impact, fantasy' }}
        >
          MOMENTO
        </h1>

        {/* Subtitle */}
        <p className="text-3xl md:text-4xl text-orange-800 mb-4 font-serif italic drop-shadow-md">
          Your Beautiful Memory Journal
        </p>

        {/* Description */}
        <p className="text-lg text-orange-700 mb-12 max-w-2xl mx-auto font-serif leading-relaxed drop-shadow-sm">
          Capture your precious moments, transform them into poetic stories with AI, and preserve them in a beautiful animated journal. Every memory deserves to be remembered beautifully.
        </p>

        {/* CTA Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          {/* Open Journal Button */}
          <Link
            href="/journal"
            className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 active:scale-95"
          >
            <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span>Open Your Journal</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>

          {/* Add Memory Button */}
          <Link
            href="/upload"
            className="group inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-orange-600 border-2 border-orange-600 hover:border-orange-700 px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 active:scale-95"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            <span>Add New Memory</span>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          {/* Feature 1: Capture */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
              📸
            </div>
            <h3 className="text-xl font-bold text-orange-900 mb-2">Capture</h3>
            <p className="text-sm text-orange-700 font-serif leading-relaxed">
              Upload your favorite photos and let them tell their story
            </p>
          </div>

          {/* Feature 2: Transform */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-rose-100 hover:border-rose-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
              ✨
            </div>
            <h3 className="text-xl font-bold text-orange-900 mb-2">Transform</h3>
            <p className="text-sm text-orange-700 font-serif leading-relaxed">
              AI generates poetic titles and descriptions for your memories
            </p>
          </div>

          {/* Feature 3: Preserve */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group">
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
              📖
            </div>
            <h3 className="text-xl font-bold text-orange-900 mb-2">Preserve</h3>
            <p className="text-sm text-orange-700 font-serif leading-relaxed">
              View all memories in a beautiful animated journal with flip animations
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-orange-200">
          <div className="grid grid-cols-3 gap-6 md:gap-10">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">∞</div>
              <p className="text-sm text-orange-700 font-serif">Memories</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">🤖</div>
              <p className="text-sm text-orange-700 font-serif">AI Powered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">✨</div>
              <p className="text-sm text-orange-700 font-serif">Beautiful UX</p>
            </div>
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-12 text-sm text-orange-700 font-serif space-y-2">
          <p className="text-base font-bold">✨ Made with love for preserving precious moments ✨</p>
          <p className="text-xs opacity-75">Your memories. Your journal. Forever.</p>
        </div>
      </div>

      {/* Floating animation indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-orange-600 font-serif opacity-50 animate-pulse">
        Click to begin your journey →
      </div>
    </div>
  )
}
