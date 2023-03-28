const Booking = require('./booking')
const Bungalov = require('./bungalov')
const Review = require('./review')

class User {
  bookings = []
  bungalovs = []

  constructor(name) {
    this.name = name
  }

  book(bungalov, checkInDate, checkOutDate) {
    const checkInDateAsDate = new Date(checkInDate)
    const checkOutDateAsDate = new Date(checkOutDate)

    // check dates
    if (checkInDateAsDate >= checkOutDateAsDate) throw new Error('Check in date must be before check out date')
    if (checkInDateAsDate < new Date()) throw new Error('Check in date must be in the future')
    if (checkOutDateAsDate < new Date()) throw new Error('Check out date must be in the future')

    if (!bungalov.isAvailable(checkInDate, checkOutDate)) throw new Error('Bungalov is not available for these dates')

    const booking = new Booking(this, bungalov, checkInDate, checkOutDate)

    this.bookings.push(booking)
    bungalov.bookings.push(booking)

    return booking
  }

  get profile() {
    return `
      ##Name: ${this.name}
      ${this.bungalovs.length > 0 ? `Bungalovs: ${this.bungalovs.map(bungalov => bungalov.name).join(', ')}` : ''}
      ##Bookings:
        ${this.bookings
          .map(
            booking =>
              `- ${booking.bungalov.name}  -  ${booking.checkInDate} - ${booking.checkOutDate} ${booking.duration} nights - $${booking.totalPrice}`
          )
          .join(',\n\t')}
      `
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

  review(booking, rating, comment) {
    //check if booking is not reviewed
    if (booking.isReviewed) throw new Error('You cannot review a booking that is already reviewed')

    //check if booking is in this.bookings
    if (!this.bookings.includes(booking)) throw new Error('You cannot review a booking that is not yours')

    //check if rating is between 1 and 5
    if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5')

    //check if comment is not empty
    if (comment === '') throw new Error('Comment cannot be empty')

    const review = new Review(booking, rating, comment, this)

    booking.review = review
    booking.bungalov.reviews.push(review)

    return booking
  }
}

module.exports = User
