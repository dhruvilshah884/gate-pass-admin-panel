import _mongoose, { connect } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null
    conn: typeof _mongoose | null
  }
}

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = connect(MONGODB_URI!, {
      bufferCommands: false,
      dbName: 'Gate-Pass'
    })
      .then(mongoose => {
        return mongoose
      })
      .catch(e => {
        console.log('e -> ', e)
        cached.promise = null
        throw e
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
