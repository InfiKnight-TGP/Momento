export interface Memory {
  id: string
  imageUrl: string
  story: string
  createdAt: Date
  emotions?: string[]
  people?: Person[]
  themes?: string[]
  locations?: string[]
  events?: string[]
  embedding?: string
  keywords?: string
}

export interface Person {
  name: string
  relationship?: string
}

export interface MemoryFormData {
  image: File
  story: string
}

export interface AIInsights {
  emotions: string[]
  people: Person[]
  themes: string[]
  locations: string[]
  events: string[]
  keywords: string[]
}