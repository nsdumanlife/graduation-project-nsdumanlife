const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const bungalovSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  capacity: {
    type: Number,
    min: 1,
    required: true,
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  amenities: [
    // {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Amenity',
    //   autopopulate: {
    //     maxDepth: 1,
    //   },
    // },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: {
      maxDepth: 1,
    },
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
})

class Bungalov {
  get averageRating() {
    const totalRating = this.reviews.reduce((total, review) => total + review.rating, 0)
    return totalRating / this.reviews.length
  }

  isAvailable(checkInDate, checkOutDate) {
    const checkInDateAsDate = new Date(checkInDate)
    const checkOutDateAsDate = new Date(checkOutDate)

    return this.bookings.every(booking => {
      const bookingCheckInDateAsDate = new Date(booking.checkInDate)
      const bookingCheckOutDateAsDate = new Date(booking.checkOutDate)

      return checkInDateAsDate >= bookingCheckOutDateAsDate || checkOutDateAsDate <= bookingCheckInDateAsDate
    })
  }
}

bungalovSchema.loadClass(Bungalov)
bungalovSchema.plugin(autopopulate)

module.exports = mongoose.model('Bungalov', bungalovSchema)
