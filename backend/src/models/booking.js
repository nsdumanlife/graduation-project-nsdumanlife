const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const bookingSchema = new mongoose.Schema(
  {
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
    checkInDate: String,
    checkOutDate: String,
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
      autopopulate: {
        maxDepth: 1,
      },
      default: null,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
)

class Booking {
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

  get isCompleted() {
    return new Date(this.checkOutDate) < new Date()
  }
}

bookingSchema.loadClass(Booking)
bookingSchema.plugin(autopopulate)

module.exports = mongoose.model('Booking', bookingSchema)
