import express from 'express'
import Post from '../models/Post.js'

const router = express.Router()

// GET /api/posts
router.get('/', async (req, res, next) => {
  try {
    const requestedLimit = Number(req.query.limit)
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(requestedLimit, 1), 100)
      : 24

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()

    return res.status(200).json({ data: posts })
  } catch (error) {
    return next(error)
  }
})

// POST /api/posts
router.post('/', async (req, res, next) => {
  try {
    const title = req.body.title?.trim() || ''
    const description = req.body.description?.trim() || ''
    const image = req.body.image?.trim() || ''
    const videoUrl = req.body.videoUrl?.trim() || ''
    const category = req.body.category?.trim() || 'general'

    const missingFields = [
      ['title', title],
      ['description', description],
      ['image', image],
      ['videoUrl', videoUrl],
    ]
      .filter(([, value]) => !value)
      .map(([name]) => name)

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required field(s): ${missingFields.join(', ')}`,
      })
    }

    const post = await Post.create({
      title,
      description,
      image,
      videoUrl,
      category,
    })

    return res.status(201).json({
      message: 'Post created successfully',
      data: post,
    })
  } catch (error) {
    return next(error)
  }
})

// Keep space for future APIs:
// router.get('/', ...)
// router.get('/:id', ...)
// router.patch('/:id', ...)
// router.delete('/:id', ...)

export default router
