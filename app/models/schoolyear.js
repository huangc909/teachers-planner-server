const mongoose = require('mongoose')
const dayOfYear = require('./dayOfYear')

const schoolYearSchema = new mongoose.Schema({
  startYear: {
    type: String,
    required: true
  },
  daysOfYear: [dayOfYear],
  endYear: {
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

module.exports = mongoose.model('SchoolYear', schoolYearSchema)
