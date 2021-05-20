const mongoose = require('mongoose')

const dayOfYearSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = dayOfYearSchema
