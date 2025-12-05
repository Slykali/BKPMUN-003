import express from 'express'
import Teacher from '../models/Teacher.js'

const router = express.Router()

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ order: 1 })
    res.json(teachers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single teacher
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' })
    }
    res.json(teacher)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create teacher
router.post('/', async (req, res) => {
  try {
    const teacher = new Teacher(req.body)
    await teacher.save()
    res.status(201).json(teacher)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update teacher
router.put('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' })
    }
    res.json(teacher)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete teacher
router.delete('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id)
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' })
    }
    res.json({ message: 'Teacher deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

