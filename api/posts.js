import connectDB from '../config/db.js'
import Post from '../models/Post.js'

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

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
}

const parseJsonBody = (body) => {
  if (!body) {
    return {}
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }

  return body
}

const handleGet = async (req, res) => {
  const requestedLimit = Number(req.query.limit)
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(Math.max(requestedLimit, 1), 100)
    : 24

  const posts = await Post.find({}).sort({ createdAt: -1 }).limit(limit).lean()
  return res.status(200).json({ data: posts })
}

const handlePost = async (req, res) => {
  const body = parseJsonBody(req.body)
  const title = body.title?.trim() || ''
  const description = body.description?.trim() || ''
  const image = body.image?.trim() || ''
  const videoUrl = body.videoUrl?.trim() || ''
  const category = body.category?.trim() || 'general'

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
}

export default async function handler(req, res) {
  setCommonHeaders(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  try {
    if (!process.env.MONGO_URI) {
      if (req.method === 'GET') {
        return res.status(200).json({ data: [] })
      }

      return res.status(503).json({
        message: 'Post publishing is unavailable until MONGO_URI is configured.',
      })
    }

    await connectDB()

    if (req.method === 'GET') {
      return await handleGet(req, res)
    }

    if (req.method === 'POST') {
      return await handlePost(req, res)
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message || 'Internal server error' })
  }
}
