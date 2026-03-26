import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import connectDB from './config/db.js'
import postRoutes from './routes/postRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 5000

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173']

app.use(helmet())
app.use(morgan('dev'))
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('CORS policy: This origin is not allowed.'))
    },
    credentials: true,
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', (_req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  next()
})

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

app.get('/api', (_req, res) => {
  res.json({ message: 'Deeronix Express server is running.' })
})

app.use('/api/posts', postRoutes)
app.use('/api/upload', uploadRoutes)

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, _req, res, _next) => {
  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message })
  }

  console.error(err)
  return res.status(500).json({ message: err.message || 'Internal server error' })
})

const startServer = async () => {
  try {
    await connectDB()

    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
