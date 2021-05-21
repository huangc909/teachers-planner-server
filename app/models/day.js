const mongoose = require('mongoose')
const taskSchema = require('./task')

const daySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  tasks: [taskSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = daySchema
