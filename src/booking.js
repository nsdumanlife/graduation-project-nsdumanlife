class Booking {
  constructor(user, bungalov, checkInDate, checkOutDate) {
    this.user = user
    this.bungalov = bungalov
    this.checkInDate = checkInDate
    this.checkOutDate = checkOutDate
  }

  get duration() {
    const checkInDateAsDate = new Date(this.checkInDate)
    const checkOutDateAsDate = new Date(this.checkOutDate)

    return (checkOutDateAsDate - checkInDateAsDate) / (1000 * 3600 * 24)
  }

  get totalPrice() {
    return this.duration * this.bungalov.price
  }
}

module.exports = Booking
