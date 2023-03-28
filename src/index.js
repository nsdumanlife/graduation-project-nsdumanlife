const User = require('./user')
const Booking = require('./booking')

console.log('Bungaa is a booking bungalov app')

// X  I need 3 main objects User, Bungalov, Booking
// X  User: name, bungalovs, bookings
// X  Bungalov: name, price, location, owner, bookings
// X  Booking: user, bungalov, checkInDate, checkOutDate
// X  I need to create a booking for a user
// X  I need to cancel a booking for a user
// X  I need to create a bungalov for a user
// X  I need to check if a bungalov is available for a date range
// X  I need to get a user profile
// I need to get all bookings for a user
// I need to get all bookings for a bungalov
// I need to get all bungalovs for a user

const numan = new User('Numan')
const armagan = new User('Armagan')

const numansBungalov = numan.createBungalov('numansBungalov', 100, 'Istanbul')

// const booking1 = new Booking(armagan, numansBungalov, '2023-01-01', '2023-01-07')

armagan.book(numansBungalov, '2024-01-01', '2024-01-07')
armagan.cancelBooking(armagan.bookings[0])

armagansBooking = armagan.book(numansBungalov, '2024-01-08', '2024-01-10')

armagan.review(armagansBooking, 5, 'This was a great bungalov')

// console.log(`Numan has a name ${numan.name}: ${numan.name === 'Numan'}`)
// console.log(`Numan has a bungalov ${numan.bungalovs.length}: ${numan.bungalovs.length === 1}`)
// console.log(`Armagan has bookings ${armagan.bookings.length}: ${armagan.bookings.length === 1}`)
// console.log(`Armagan has ${armagan.bungalovs.length} bungalovs: ${armagan.bungalovs.length === 0}`)

console.log(armagan.profile)
