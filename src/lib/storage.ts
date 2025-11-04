import { Storage } from '@google-cloud/storage'

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
})

const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET || 'photo-journal-images'

export async function uploadImage(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const fileName = `memories/${Date.now()}-${file.name}`

  const bucket = storage.bucket(bucketName)
  const fileRef = bucket.file(fileName)

  await fileRef.save(buffer, {
    metadata: {
      contentType: file.type,
    },
  })

  // Make the file publicly readable
  await fileRef.makePublic()

  return `https://storage.googleapis.com/${bucketName}/${fileName}`
}