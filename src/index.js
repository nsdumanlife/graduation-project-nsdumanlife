console.log('Bungaa is a booking bungalov app')

// I need 3 main objects User, Bungalov, Booking
// User: name, bungalovs, bookings
// Bungalov: name, price, location, owner, bookings
// Booking: user, bungalov, checkInDate, checkOutDate
// I need to create a booking for a user
// I need to cancel a booking for a user
// I need to get all bookings for a user
// I need to get all bookings for a bungalov
// I need to get all bungalovs for a user

class User {
  bookings = []
  bungalovs = []

  constructor(name) {
    this.name = name
    // this.bungalovs = []
    // this.bookings = []
  }

  book(bungalov, checkInDate, checkOutDate) {
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

class Booking {
  constructor(user, bungalov, checkInDate, checkOutDate) {
    this.user = user
    this.bungalov = bungalov
    this.checkInDate = checkInDate
    this.checkOutDate = checkOutDate
  }
}

class Bungalov {
  bookings = []

  constructor(name, price, location, owner) {
    this.name = name
    this.price = price
    this.location = location
    this.owner = owner
  }
}

const numan = new User('Numan')
const armagan = new User('Armagan')

const numansBungalov = numan.createBungalov('numansBungalov', 100, 'Istanbul')

armagan.book(numansBungalov, '2020-01-01', '2020-01-03')
armagan.cancelBooking(armagan.bookings[0])

// console.log(`Numan has a name ${numan.name}: ${numan.name === 'Numan'}`)
// console.log(`Numan has a bungalov ${numan.bungalovs.length}: ${numan.bungalovs.length === 1}`)
// console.log(`Armagan has bookings ${armagan.bookings.length}: ${armagan.bookings.length === 0}`)
// console.log(`Armagan has ${armagan.bungalovs.length} bungalovs: ${armagan.bungalovs.length === 0}`)
