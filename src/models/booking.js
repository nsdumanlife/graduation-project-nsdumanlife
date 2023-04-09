const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1,
    },
  },
  bungalov: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bungalov',
    autopopulate: {
      maxDepth: 1,
    },
  },
  checkInDate: Date,
  checkOutDate: Date,
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    autopopulate: {
      maxDepth: 1,
    },
  },
})

class Booking {
  // review = null

  // constructor(user, bungalov, checkInDate, checkOutDate) {
  //   this.user = user
  //   this.bungalov = bungalov
  //   this.checkInDate = checkInDate
  //   this.checkOutDate = checkOutDate
  // }

  get duration() {
    const checkInDateAsDate = new Date(this.checkInDate)
    const checkOutDateAsDate = new Date(this.checkOutDate)

    return (checkOutDateAsDate - checkInDateAsDate) / (1000 * 3600 * 24)
  }

  get totalPrice() {
    return this.duration * this.bungalov.price
  }

  get isReviewed() {
    return this.review !== null
  }
}

bookingSchema.loadClass(Booking)
bookingSchema.plugin(autopopulate)

module.exports = mongoose.model('Booking', bookingSchema)
