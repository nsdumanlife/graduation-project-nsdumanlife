const express = require('express')
const router = express.Router()
const Booking = require('../models/booking')
const Bungalov = require('../models/bungalov')

// create a review for a booking
router.post('/', async function (req, res, next) {
  try {
    const booking = await Booking.findById(req.body.booking)

    if (!req.user) return next({ status: 404, message: 'User not found' })

    if (!booking) return next({ status: 404, message: 'Booking not found' })

    if (booking.user._id.toString() !== req.user._id.toString())
      return next({ status: 401, message: 'You are not authorized to review this booking' })

    if (booking.review) return next({ status: 400, message: 'You have already reviewed this booking' })

    if (booking.checkOutDate > new Date())
      return next({ status: 400, message: 'You cannot review a booking that is not completed' })

    if (req.body.text === '') return next({ status: 400, message: 'You must provide a review text' })

    if (req.body.rating < 1 || req.body.rating > 5)
      return next({ status: 400, message: 'Rating must be between 1 and 5' })

    const review = await req.user.review(booking, req.body.rating, req.body.text)

    res.send(review)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// get reviews for a bungalov
router.get('/:bungalovId', async function (req, res, next) {
  const bungalov = await Bungalov.findById(req.params.bungalovId)

  if (!bungalov) return res.status(404).send('Bungalov not found')

  res.send(bungalov.reviews)
})

module.exports = router
