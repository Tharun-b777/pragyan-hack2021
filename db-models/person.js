const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  latitude: {
    type: Number
  },
  longitude: {
    type: Number
  },
  updatedAt: {
    type: Date
  }
})
module.exports = mongoose.model('person', personSchema);