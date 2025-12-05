import mongoose from 'mongoose'

const studyGuideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['security', 'economic', 'environmental', 'human-rights'],
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  duration: {
    type: String,
    default: 'customizable'
  },
  pages: {
    type: String,
    default: 'customizable'
  },
  tags: [{
    type: String
  }],
  content: {
    type: String,
    default: ''
  },
  fileUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
})

export default mongoose.model('StudyGuide', studyGuideSchema)

