import multer from 'multer'
import { uploadBufferToCloudinary } from '../config/cloudinary.js'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true)
      return
    }

    callback(new Error('Only image files are allowed.'))
  },
})

const runMiddleware = (req, res, middleware) =>
  new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        reject(result)
        return
      }

      resolve(result)
    })
  })

const setCommonHeaders = (req, res) => {
  const allowedOrigins = process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim())
    : []

  const requestOrigin = req.headers.origin
  if (requestOrigin && (allowedOrigins.length === 0 || allowedOrigins.includes(requestOrigin))) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

export default async function handler(req, res) {
  setCommonHeaders(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const hasCloudinaryConfig =
      Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
      Boolean(process.env.CLOUDINARY_API_KEY) &&
      Boolean(process.env.CLOUDINARY_API_SECRET)

    if (!hasCloudinaryConfig) {
      return res.status(503).json({
        message: 'Image upload is unavailable until Cloudinary environment variables are configured.',
      })
    }

    await runMiddleware(req, res, upload.single('file'))

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded. Use field name "file".' })
    }

    const uploadResult = await uploadBufferToCloudinary(req.file.buffer, {
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'deeronix',
      resource_type: 'image',
      use_filename: true,
      unique_filename: true,
    })

    return res.status(201).json({
      message: 'Upload successful',
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      resourceType: uploadResult.resource_type,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message || 'Internal server error' })
  }
}
