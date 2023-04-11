const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Booking = require('../models/booking')
const Bungalov = require('../models/bungalov')

// create a review for a booking
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)
  const booking = await Booking.findById(req.body.booking)

  if (!user) return res.status(404).send('User not found')

  const review = await user.review(booking, req.body.rating, req.body.comment)

  res.send(review)
})

// get reviews for a bungalov
router.get('/:bungalovId', async function (req, res, next) {
  const bungalov = await Bungalov.findById(req.params.bungalovId)

  if (!bungalov) return res.status(404).send('Bungalov not found')

  res.send(bungalov.reviews)
})

module.exports = router
