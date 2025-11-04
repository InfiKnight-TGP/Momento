import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Photo Journal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Combine your photos with personal stories. Let AI help you discover the deeper meaning behind your memories.
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                We're building an intelligent photo journal that understands not just what you captured, but what it meant to you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">📸 Upload & Tell</h3>
                  <p className="text-blue-700 text-sm">
                    Upload photos and write naturally about what happened
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">🤖 AI Understanding</h3>
                  <p className="text-green-700 text-sm">
                    Extract emotions, people, themes, and relationships
                  </p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">🔍 Smart Search</h3>
                  <p className="text-purple-700 text-sm">
                    Find memories by meaning, not just keywords
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}