import express from 'express'
import multer from 'multer'
import { uploadBufferToCloudinary } from '../config/cloudinary.js'

const router = express.Router()

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

router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded. Use field name "file".' })
    }

    const uploadResult = await uploadBufferToCloudinary(req.file.buffer, {
      folder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'deeronix',
      resource_type: 'auto',
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
    return next(error)
  }
})

export default router
