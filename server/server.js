import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import teacherRoutes from './routes/teachers.js'
import committeeRoutes from './routes/committees.js'
import scheduleRoutes from './routes/schedule.js'
import studyGuideRoutes from './routes/studyGuides.js'
import announcementRoutes from './routes/announcements.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bkpmun', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err))

// Routes
app.use('/api/teachers', teacherRoutes)
app.use('/api/committees', committeeRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/study-guides', studyGuideRoutes)
app.use('/api/announcements', announcementRoutes)

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BKPMUN API is running!' })
})

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📍 API: http://localhost:${PORT}/api`)
})

