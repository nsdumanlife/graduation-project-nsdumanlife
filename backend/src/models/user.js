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
        maxDepth: 2,
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
