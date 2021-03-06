const mongoose = require('mongoose')
const monthSchema = require('./month')

const schoolYearSchema = new mongoose.Schema({
  startYear: {
    type: String,
    required: true
  },
  endYear: {
    type: String,
    required: true
  },
  months: [monthSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('SchoolYear', schoolYearSchema)
