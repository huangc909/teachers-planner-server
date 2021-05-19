const mongoose = require('mongoose')

const schoolyearSchema = new mongoose.Schema({
  startYear: {
    type: Number,
    required: true
  },
  endYear: {
    type: Number
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Schoolyear', schoolyearSchema)
