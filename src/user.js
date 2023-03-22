const Booking = require('./booking')
const Bungalov = require('./bungalov')

class User {
  bookings = []
  bungalovs = []

  constructor(name) {
    this.name = name
  }

  book(bungalov, checkInDate, checkOutDate) {
    if (!bungalov.isAvailable(checkInDate, checkOutDate)) throw new Error('Bungalov is not available for these dates')

    const booking = new Booking(this, bungalov, checkInDate, checkOutDate)

    this.bookings.push(booking)
    bungalov.bookings.push(booking)
  }


  createBungalov(name, price, location) {
    const bungalov = new Bungalov(name, price, location, this)
    this.bungalovs.push(bungalov)

    return bungalov
  }

  cancelBooking(booking) {
    const bookingIndex = this.bookings.indexOf(booking)
    this.bookings.splice(bookingIndex, 1)

    const bungalovBookingIndex = booking.bungalov.bookings.indexOf(booking)
    booking.bungalov.bookings.splice(bungalovBookingIndex, 1)
  }
}

module.exports = User
