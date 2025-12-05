import mongoose from 'mongoose'

const committeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '🌍'
  },
  members: {
    type: String,
    default: 'customizable'
  },
  status: {
    type: String,
    default: 'customizable'
  },
  topics: [{
    type: String
  }],
  schedule: {
    time: String,
    location: String,
    day: String
  }
}, {
  timestamps: true
})

export default mongoose.model('Committee', committeeSchema)

