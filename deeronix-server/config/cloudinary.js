import { Readable } from 'node:stream'
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

let isConfigured = false

const configureCloudinary = () => {
  if (isConfigured) {
    return
  }

  const requiredEnvVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ]

  const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name])

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing Cloudinary environment variables: ${missingEnvVars.join(', ')}`,
    )
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })

  isConfigured = true
}

export const uploadBufferToCloudinary = (buffer, options = {}) =>
  new Promise((resolve, reject) => {
    configureCloudinary()

    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        reject(error)
        return
      }

      resolve(result)
    })

    Readable.from(buffer).pipe(stream)
  })

export default cloudinary
