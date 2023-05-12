const Booking = require('./booking')
const Bungalov = require('./bungalov')
const Review = require('./review')

const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  bungalovs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bungalov',
      autopopulate: {
        maxDepth: 1,
      },
    },
  ],
})

class User {
  async book(bungalov, checkInDate, checkOutDate) {
    // check dates
    if (new Date(checkInDate) >= new Date(checkOutDate))
      throw new Error('The check in date must be before the check out date')
    if (checkInDate < new Date()) throw new Error('Check in date must be in the future')
    if (checkOutDate < new Date()) throw new Error('Check out date must be in the future')

    if (!bungalov.isAvailable(checkInDate, checkOutDate)) throw new Error('Bungalov is not available for these dates')

    const booking = await Booking.create({
      user: this,
      bungalov: bungalov,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    })

    this.bookings.push(booking)
    bungalov.bookings.push(booking)

    await this.save()
    await bungalov.save()

    return booking
  }

  async createBungalov(name, price, location, description, capacity, images, amenities, rules) {
    const bungalov = await Bungalov.create({
      name: name,
      price: price,
      location: location,
      owner: this,
      description: description,
      capacity: capacity,
      images: images,
      // amenities: amenities,
      // rules: rules,
    })
    this.bungalovs.push(bungalov)

    await this.save()

    return bungalov
  }

  async cancelBooking(booking) {
    //check if booking is in this.bookings
    if (!this === booking.user) throw new Error('You cannot cancel a booking that is not yours')

    // cancel booking
    await Booking.findByIdAndDelete(booking._id)

    // remove booking from user
    const userBookingIndex = this.bookings.indexOf(booking)
    this.bookings.splice(userBookingIndex, 1)

    // remove booking from bungalov
    const bungalovBookingIndex = booking.bungalov.bookings.indexOf(booking)
    booking.bungalov.bookings.splice(bungalovBookingIndex, 1)

    await this.save()
    await booking.bungalov.save()

    return booking
  }

  async review(booking, rating, text) {
    //check if booking is in this.bookings
    if (!this === booking.user) throw new Error('You cannot review a booking that is not yours')

    // check if booking is in the past
    // if (!booking.isCompleted) throw new Error('You cannot review a booking that is not completed')

    //check if booking is not reviewed
    if (booking.isReviewed) throw new Error('You cannot review a booking that is already reviewed')

    //check if rating is between 1 and 5
    if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5')

    //check if text is not empty
    if (text === '') throw new Error('text cannot be empty')

    const review = await Review.create({ bungalov: booking.bungalov, rating: rating, text: text, author: this })

    const bungalov = booking.bungalov

    await Booking.findByIdAndUpdate(booking._id, { review: review }, { new: true })

    bungalov.reviews.push(review)

    await booking.save()
    await bungalov.save()

    return booking
  }
}

userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.loadClass(User)

module.exports = mongoose.model('User', userSchema)
