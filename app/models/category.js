const mongoose = require('mongoose')
// const monthSchema = require('./month')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // months: [monthSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)
