import mongoose from 'mongoose'

const globalWithMongoose = global

if (!globalWithMongoose._deeronixMongoose) {
  globalWithMongoose._deeronixMongoose = {
    conn: null,
    promise: null,
  }
}

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI

  if (!mongoUri) {
    throw new Error('Missing MONGO_URI in environment variables.')
  }

  if (globalWithMongoose._deeronixMongoose.conn) {
    return globalWithMongoose._deeronixMongoose.conn
  }

  mongoose.set('strictQuery', true)

  if (!globalWithMongoose._deeronixMongoose.promise) {
    globalWithMongoose._deeronixMongoose.promise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    })
  }

  globalWithMongoose._deeronixMongoose.conn =
    await globalWithMongoose._deeronixMongoose.promise

  return globalWithMongoose._deeronixMongoose.conn
}

export default connectDB
