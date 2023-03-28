class Bungalov {
  bookings = []
  reviews = []

  constructor(name, price, location, owner) {
    this.name = name
    this.price = price
    this.location = location
    this.owner = owner
  }

  get avarageRating() {
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

module.exports = Bungalov
