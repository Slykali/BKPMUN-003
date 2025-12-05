import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  events: [{
    time: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    }
  }]
}, {
  timestamps: true
})

export default mongoose.model('Schedule', scheduleSchema)

