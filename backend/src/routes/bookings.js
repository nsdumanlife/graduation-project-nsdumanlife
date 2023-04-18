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

  res.send(bookings)
})

// get boookings list for a user with a given name
router.get('/:bookingId', async function (req, res, next) {
  const booking = await Booking.findById(req.params.bookingId)

  if (!booking) return next({ status: 404, meesage: 'Booking not found' })

  res.send(booking)
})

// create a booking for a bungalov by a user
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)

  if (!user) return next({ status: 404, meesage: 'User not found' })

  const bungalov = await Bungalov.findById(req.body.bungalov)

  const booking = await user.book(bungalov, req.body.checkInDate, req.body.checkOutDate)

  res.send(booking)
})

// delete a booking
router.delete('/:bookingId', async function (req, res, next) {
  const booking = await Booking.findById(req.params.bookingId)

  if (!booking) return next({ status: 404, meesage: 'Booking not found' })

  await booking.user.cancelBooking(booking)

  res.sendStatus(200)
})

router.put('/:bookingId', async function (req, res, next) {
  const booking = await Booking.findById(req.params.bookingId)

  if (!booking) return next({ status: 404, meesage: 'Booking not found' })

  if (res.body.user != booking.user) return next({ status: 403, meesage: 'User is not booking owner' })

  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.bookingId,
    { checkInDate: req.body.checkInDate, checkOutDate: req.body.checkOutDate },
    { new: true }
  )

  res.send(updatedBooking)
})

module.exports = router
