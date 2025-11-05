'use client'

interface BookmarkButtonProps {
  onClick: () => void
}

export default function BookmarkButton({ onClick }: BookmarkButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-6 right-6 z-40 group"
      title="Add Memory"
    >
      {/* Bookmark shape with + icon */}
      <div className="relative w-16 h-24 bg-gradient-to-b from-blue-600 to-blue-700 rounded-b-lg shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center">
        {/* Notch at top */}
        <div className="absolute top-0 left-2 w-3 h-3 bg-blue-800 rounded-full"></div>
        <div className="absolute top-0 right-2 w-3 h-3 bg-blue-800 rounded-full"></div>

        {/* + Icon */}
        <div className="text-white text-4xl font-bold">+</div>

        {/* Ribbon effect */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-blue-700 rounded-b-full"></div>
      </div>

      {/* Hover tooltip */}
      <div className="absolute top-full right-0 mt-2 bg-gray-900 text-white text-sm px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Add Memory
      </div>
    </button>
  )
}
