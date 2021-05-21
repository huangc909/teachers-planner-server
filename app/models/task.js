const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  dueDate: {
    type: String
  },
  priority: {
    type: Boolean,
    default: false
  },
  checkmark: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = taskSchema
