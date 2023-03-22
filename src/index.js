const User = require('./user')

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

const numan = new User('Numan')
const armagan = new User('Armagan')

const numansBungalov = numan.createBungalov('numansBungalov', 100, 'Istanbul')

armagan.book(numansBungalov, '2024-01-01', '2024-01-07')
// armagan.cancelBooking(armagan.bookings[0])

armagan.book(numansBungalov, '2024-01-08', '2024-01-10')

// console.log(`Numan has a name ${numan.name}: ${numan.name === 'Numan'}`)
// console.log(`Numan has a bungalov ${numan.bungalovs.length}: ${numan.bungalovs.length === 1}`)
// console.log(`Armagan has bookings ${armagan.bookings.length}: ${armagan.bookings.length === 0}`)
// console.log(`Armagan has ${armagan.bungalovs.length} bungalovs: ${armagan.bungalovs.length === 0}`)

console.log(armagan.profile)
