const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Bungalov = require('../models/bungalov')
const Booking = require('../models/booking')
const user = require('../models/user')
const booking = require('../models/booking')

// get bookings
router.get('/', async function (req, res, next) {
  const bookings = await Booking.find()

  if (req.query.view === 'json') return res.send(bookings)

  res.render('bookings', { bookings })
})

// get boookings list for a user with a given name
router.get('/:userId', async function (req, res, next) {
  const user = await User.findById(req.params.userId)

  if (!user) return res.status(404).send('User not found')

  if (req.query.view === 'json') return res.send(user.bookings)

  res.render('bookings', { user: user })
})

// create a booking for a bungalov by a user
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)

  if (!user) return res.status(404).send('User not found')

  const bungalov = await Bungalov.findById(req.body.bungalov)

  const booking = await user.book(bungalov, req.body.checkInDate, req.body.checkOutDate)

  res.send(booking)
})

// delete a booking
router.delete('/:bookingId', async function (req, res, next) {
  const booking = await Booking.findById(req.params.bookingId)

  if (!booking) return res.status(404).send('Booking not found')

  await booking.user.cancelBooking(booking)

  if (!booking) return res.status(404).send('Booking not found')

  res.sendStatus(200)
})

// TODO update a booking
router.put('/:bookingId', async function (req, res, next) {
  // TODO: check user is booking owner

  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.bookingId,
    { checkInDate: req.body.checkInDate, checkOutDate: req.body.checkOutDate },
    { new: true }
  )

  if (!booking) return res.status(404).send('Booking not found')

  res.send(updatedBooking)
})

module.exports = router
