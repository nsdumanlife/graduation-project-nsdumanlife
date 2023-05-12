const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
    default: '../assets/placeholder.jpg',
  },
  alt: {
    type: String,
    default: '',
  },
})

module.exports = mongoose.model('Image', imageSchema)
