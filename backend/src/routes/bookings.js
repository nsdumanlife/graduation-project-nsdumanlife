const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Bungalov = require('../models/bungalov')
const Booking = require('../models/booking')
const user = require('../models/user')
const booking = require('../models/booking')

// get all bookings
router.get('/all', async function (req, res, next) {
  const bookings = await Booking.find()

  if (!bookings) return next({ status: 404, meesage: 'Bookings not found' })

  res.send(bookings)
})

// get bookings for a user
router.get('/', async function (req, res, next) {
  const bookings = await Booking.find(req.user)

  if (!bookings) return next({ status: 404, meesage: 'Bookings not found' })

  res.send(bookings)
})

// get a boooking for a user with a given id
router.get('/:bookingId', async function (req, res, next) {
  const booking = await Booking.findById(req.params.bookingId)

  if (!booking) return next({ status: 404, meesage: 'Booking not found' })

  res.send(booking)
})

// create a booking for a bungalov by a user
router.post('/', async function (req, res, next) {
  try {
    if (!req.user) return next({ status: 404, message: 'User not found' })

    const bungalov = await Bungalov.findById(req.body.bungalov)

    if (!bungalov) return next({ status: 404, message: 'Bungalov not found' })

    // check dates
    if (new Date(req.body.checkInDate) >= new Date(req.body.checkOutDate))
      return next({ message: 'The check in date must be before the check out date' })

    if (new Date(req.body.checkInDate) < new Date() || new Date(req.body.checkOutDate) < new Date())
      return next({ message: 'Check in/out date must be in the future' })

    if (!bungalov.isAvailable(req.body.checkInDate, req.body.checkOutDate))
      return next({ message: 'Bungalov is not available for these dates' })

    const booking = await req.user.book(bungalov, req.body.checkInDate, req.body.checkOutDate)

    res.send(booking)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// delete a booking
router.delete('/:bookingId', async function (req, res, next) {
  const booking = await Booking.findById(req.params.bookingId)

  if (!booking) return next({ status: 404, meesage: 'Booking not found' })

  if (req.user != booking.user) return next({ status: 403, meesage: 'User is not booking owner' })

  await booking.user.cancelBooking(booking)

  res.sendStatus(200)
})

router.put('/:bookingId', async function (req, res, next) {
  const booking = await Booking.findById(req.params.bookingId)

  if (!booking) return next({ status: 404, meesage: 'Booking not found' })

  if (req.user != booking.user) return next({ status: 403, meesage: 'User is not booking owner' })

  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.bookingId,
    { checkInDate: req.body.checkInDate, checkOutDate: req.body.checkOutDate },
    { new: true }
  )

  res.send(updatedBooking)
})

module.exports = router
