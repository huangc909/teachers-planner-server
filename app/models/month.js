const mongoose = require('mongoose')
const daySchema = require('./day')

const monthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  days: [daySchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = monthSchema
