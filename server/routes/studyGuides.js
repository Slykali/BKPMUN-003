import express from 'express'
import StudyGuide from '../models/StudyGuide.js'

const router = express.Router()

// Get all study guides
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query
    let query = {}
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }
    
    const guides = await StudyGuide.find(query).sort({ createdAt: -1 })
    res.json(guides)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single guide
router.get('/:id', async (req, res) => {
  try {
    const guide = await StudyGuide.findById(req.params.id)
    if (!guide) {
      return res.status(404).json({ error: 'Study guide not found' })
    }
    res.json(guide)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create guide
router.post('/', async (req, res) => {
  try {
    const guide = new StudyGuide(req.body)
    await guide.save()
    res.status(201).json(guide)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update guide
router.put('/:id', async (req, res) => {
  try {
    const guide = await StudyGuide.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!guide) {
      return res.status(404).json({ error: 'Study guide not found' })
    }
    res.json(guide)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete guide
router.delete('/:id', async (req, res) => {
  try {
    const guide = await StudyGuide.findByIdAndDelete(req.params.id)
    if (!guide) {
      return res.status(404).json({ error: 'Study guide not found' })
    }
    res.json({ message: 'Study guide deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router

