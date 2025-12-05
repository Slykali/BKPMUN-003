import express from 'express'
import Committee from '../models/Committee.js'

const router = express.Router()

// Get all committees
router.get('/', async (req, res) => {
  try {
    const committees = await Committee.find().sort({ name: 1 })
    res.json(committees)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single committee
router.get('/:id', async (req, res) => {
  try {
    const committee = await Committee.findById(req.params.id)
    if (!committee) {
      return res.status(404).json({ error: 'Committee not found' })
    }
    res.json(committee)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create committee
router.post('/', async (req, res) => {
  try {
    const committee = new Committee(req.body)
    await committee.save()
    res.status(201).json(committee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update committee
router.put('/:id', async (req, res) => {
  try {
    const committee = await Committee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!committee) {
      return res.status(404).json({ error: 'Committee not found' })
    }
    res.json(committee)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete committee
router.delete('/:id', async (req, res) => {
  try {
    const committee = await Committee.findByIdAndDelete(req.params.id)
    if (!committee) {
      return res.status(404).json({ error: 'Committee not found' })
    }
    res.json({ message: 'Committee deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

