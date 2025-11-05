import { VertexAI } from '@google-cloud/vertexai'
import { AIInsights } from '@/types/memory'

const vertexai = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT || '',
  location: process.env.GOOGLE_VERTEX_AI_LOCATION || 'us-central1',
})

const model = vertexai.getGenerativeModel({
  model: 'gemini-2.5-flash',
})

export interface EnhancedAIInsights extends AIInsights {
  title: string
  description: string
}

export async function analyzeMemory(imageUrl: string, story: string): Promise<EnhancedAIInsights> {
  const prompt = `You are a poetic postcard writer. Analyze this photo and personal story, then create:

1. A SHORT CATCHY TITLE (max 6 words) - like vintage postcards: "Greetings from Paris!" or "A Perfect Sunset Moment"
2. A HANDWRITTEN NOTE MESSAGE (2-3 sentences) - poetic, warm, personal, like writing on the back of a vintage postcard

Return ONLY this exact JSON:
{
  "title": "Catchy Postcard Title Here",
  "description": "A warm, poetic 2-3 sentence message capturing the essence and emotion of this moment, written like a vintage postcard note.",
  "emotions": ["emotion1", "emotion2", "emotion3"],
  "people": [{"name": "person", "relationship": "relationship"}],
  "themes": ["theme1", "theme2"],
  "locations": ["location1"],
  "events": ["event"],
  "keywords": ["keyword1", "keyword2"]
}

Photo and Story: "${story}"

IMPORTANT:
- Title should feel timeless and poetic
- Description should be personal, warm, and meaningful
- Capture what makes this moment special
- Make it feel like a real memory worth keeping`;

  try {
    // Fetch image and convert to base64
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    // CRITICAL: Correct request format for Vertex AI
    const request = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Image,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    console.log('Sending request to Gemini for postcard...');
    const result = await model.generateContent(request);
    console.log('Gemini response received');
    
    const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    console.log('Gemini raw output:', text);

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      console.log('Parsed postcard insights:', parsed);
      return parsed;
    }

    console.log('No valid JSON found in response, returning defaults');
    // Fallback with default postcard values
    return {
      title: 'A Cherished Memory',
      description: 'A special moment captured and preserved in time.',
      emotions: [],
      people: [],
      themes: [],
      locations: [],
      events: [],
      keywords: [],
    };
  } catch (error) {
    console.error('AI analysis error:', error);
    return {
      title: 'A Cherished Memory',
      description: 'A special moment captured and preserved in time.',
      emotions: [],
      people: [],
      themes: [],
      locations: [],
      events: [],
      keywords: [],
    };
  }
}
