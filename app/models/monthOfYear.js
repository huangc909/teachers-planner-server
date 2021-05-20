const mongoose = require('mongoose')

const monthOfYearSchema = new mongoose.Schema({
  month: {
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

module.exports = monthOfYearSchema
