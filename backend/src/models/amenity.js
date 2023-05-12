const mongoose = require('mongoose')

const amenitySchema = new mongoose.Schema({
  kind: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Amenity', amenitySchema)
