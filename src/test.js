const User = require('./models/user')
const Booking = require('./models/booking')

const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:3000'

console.log('Bungaa is a booking bungalov app')

async function main() {
  const numan = await axios.post('/users', {
    name: 'Numan',
  })

  const armagan = await axios.post('/users', {
    name: 'Armagan',
  })

  // console.log('armagan: ', armagan.data)
  // console.log('numan: ', numan.data)

  const allUsers = await axios.get('/users')
  // console.log('first place: ', allUsers.data)

  // delete user Numan
  await axios.delete(`/users/Numan`)

  const allUsers2 = await axios.get('/users')
  // console.log('updated: ', allUsers2.data)

  //create a bungalov for a user
  const armagansBungalov = await axios.post('/bungalovs', {
    user: 'Armagan',
    name: 'Armagans Bungalov',
    price: 100,
    location: 'Istanbul',
  })

  console.log('armagans bungalov: ', armagansBungalov.data)

  //get all bungalovs with axios
  const allBungalovs = await axios.get('/bungalovs')
  console.log('all bungalovs: ', allBungalovs.data)
}

main()

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

// const numan = new User('Numan')
// const armagan = new User('Armagan')

// const numansBungalov = numan.createBungalov('numansBungalov', 100, 'Istanbul')

// // const booking1 = new Booking(armagan, numansBungalov, '2023-01-01', '2023-01-07')

// armagan.book(numansBungalov, '2024-01-01', '2024-01-07')
// armagan.cancelBooking(armagan.bookings[0])

// armagansBooking = armagan.book(numansBungalov, '2024-01-08', '2024-01-10')

// armagan.review(armagansBooking, 5, 'This was a great bungalov')

// // console.log(`Numan has a name ${numan.name}: ${numan.name === 'Numan'}`)
// // console.log(`Numan has a bungalov ${numan.bungalovs.length}: ${numan.bungalovs.length === 1}`)
// // console.log(`Armagan has bookings ${armagan.bookings.length}: ${armagan.bookings.length === 1}`)
// // console.log(`Armagan has ${armagan.bungalovs.length} bungalovs: ${armagan.bungalovs.length === 0}`)

// console.log(armagan.profile)
