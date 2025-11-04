import { VertexAI } from '@google-cloud/vertexai'
import { AIInsights } from '@/types/memory'

const vertexai = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT || '',
  location: process.env.GOOGLE_VERTEX_AI_LOCATION || 'us-central1',
})

const model = vertexai.getGenerativeModel({
  model: 'gemini-1.5-pro',
})

export async function analyzeMemory(imageUrl: string, story: string): Promise<AIInsights> {
  const prompt = `
    Analyze this photo and story to extract meaningful insights. Return a JSON object with the following structure:

    {
      "emotions": ["array", "of", "emotions", "felt"],
      "people": [{"name": "person", "relationship": "family/friend/colleague/etc"}],
      "themes": ["array", "of", "life", "themes"],
      "locations": ["array", "of", "places", "mentioned"],
      "events": ["array", "of", "events", "that", "occurred"],
      "keywords": ["array", "of", "important", "keywords"]
    }

    Story: "${story}"

    Focus on the emotional context, relationships, and personal meaning. Extract themes like family, health, nature, celebrations, etc. Identify emotions explicitly expressed or implied.
  `

  try {
    const response = await model.generateContent([
      {
        text: prompt,
      },
      {
        fileData: {
          fileUri: imageUrl,
          mimeType: 'image/jpeg',
        },
      },
    ])

    const result = response.response
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '{}'

    // Parse JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }

    // Fallback if JSON parsing fails
    return {
      emotions: [],
      people: [],
      themes: [],
      locations: [],
      events: [],
      keywords: [],
    }
  } catch (error) {
    console.error('AI analysis error:', error)
    // Return empty insights on error
    return {
      emotions: [],
      people: [],
      themes: [],
      locations: [],
      events: [],
      keywords: [],
    }
  }
}