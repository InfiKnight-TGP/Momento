import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
})

export async function uploadImage(file: File): Promise<string> {
  const bucket = storage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET!)
  const filename = `memories/${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`
  
  const fileObj = bucket.file(filename)
  
  const buffer = await file.arrayBuffer()
  await fileObj.save(Buffer.from(buffer), {
    metadata: {
      contentType: file.type,
    },
  })
  
  return `https://storage.googleapis.com/${bucket.name}/${filename}`
}
