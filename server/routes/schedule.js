import express from 'express'
import Schedule from '../models/Schedule.js'

const router = express.Router()

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().sort({ day: 1 })
    res.json(schedules)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single schedule
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' })
    }
    res.json(schedule)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create schedule
router.post('/', async (req, res) => {
  try {
    const schedule = new Schedule(req.body)
    await schedule.save()
    res.status(201).json(schedule)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update schedule
router.put('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' })
    }
    res.json(schedule)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete schedule
router.delete('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id)
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' })
    }
    res.json({ message: 'Schedule deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

