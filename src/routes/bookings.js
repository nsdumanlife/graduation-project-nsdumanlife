const express = require('express')
const router = express.Router()
const User = require('../models/user')

// get boookings list for a user with a given name
router.get('/:userName', function (req, res, next) {
  const user = User.list.find(user => user.name === req.params.userName)

  if (!user) return res.status(404).send('User not found')

  if (req.query.view === 'json')
    return res.send(
      user.bookings.map(booking => ({
        bungalov: booking.bungalov,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
      }))
    )

  res.render('bookings', { user: user })
})

module.exports = router
