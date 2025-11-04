'use client'

import { useState } from 'react'

interface StoryInputProps {
  story: string
  onStoryChange: (story: string) => void
  onSubmit: () => void
  isLoading?: boolean
}

export default function StoryInput({ story, onStoryChange, onSubmit, isLoading }: StoryInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (story.trim() && !isLoading) {
      onSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-2">
          Tell your story
        </label>
        <textarea
          id="story"
          value={story}
          onChange={(e) => onStoryChange(e.target.value)}
          placeholder="Write naturally about what happened, how you felt, who was there... Like you're texting a friend."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
          rows={6}
          disabled={isLoading}
        />
        <div className="mt-2 text-sm text-gray-500">
          {story.length} characters
        </div>
      </div>

      <button
        type="submit"
        disabled={!story.trim() || isLoading}
        className={`
          w-full py-3 px-4 rounded-lg font-medium transition-all
          ${story.trim() && !isLoading
            ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Analyzing with AI...</span>
          </div>
        ) : (
          'Create Memory'
        )}
      </button>

      <div className="text-xs text-gray-500 text-center">
        The AI will analyze your photo and story to extract emotions, people, themes, and meaningful patterns.
      </div>
    </form>
  )
}