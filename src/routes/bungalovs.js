const express = require('express')
const router = express.Router()

const Bungalov = require('../models/bungalov')
const User = require('../models/user')

/* GET bungalovs list. */
router.get('/', function (req, res, next) {
  if (req.query.view === 'json')
    return res.send(
      Bungalov.list.map(bungalov => ({
        name: bungalov.name,
        price: bungalov.price,
        location: bungalov.location,
      }))
    )

  res.render('bungalovs', { bungalovs: Bungalov.list })
})

// get a bungalov
router.get('/:bungalovName', function (req, res, next) {
  const bungalov = Bungalov.list.find(bungalov => bungalov.name === req.params.bungalovName)

  if (!bungalov) return res.status(404).send('Bungalov not found')

  if (req.query.view === 'json')
    return res.send({ name: bungalov.name, price: bungalov.price, location: bungalov.location })

  res.render('bungalov-detail', { bungalov })
})

// create a bungalov
router.post('/', async function (req, res, next) {
  const user = await User.findById({ _id: req.body.user })

  const bungalov = await user.createBungalov(req.body.name, req.body.price, req.body.location)

  res.send(bungalov)
})

// delete a bungalov
router.delete('/:bungalovId', async function (req, res, next) {
  const bungalov = await Bungalov.findByIdAndDelete(req.params.bungalovId)

  if (!bungalov) return res.status(404).send('Bungalov not found')

  res.sendStatus(200)
})

// update a bungalov
// router.put('/:bungalovName', function (req, res, next) {
//   const bungalov = Bungalov.list.find(bungalov => bungalov.name === req.params.bungalovName)

//   if (!bungalov) return res.status(404).send('Bungalov not found')

//   bungalov.name = req.body.name
//   bungalov.price = req.body.price
//   bungalov.location = req.body.location

//   res.send({ name: bungalov.name, price: bungalov.price, location: bungalov.location })
// })

// create a booking for a bungalov
router.post('/:bungalovID/bookings', function (req, res, next) {
  const bungalov = Bungalov.list.find(bungalov => bungalov.name === req.params.bungalovID)

  if (!bungalov) return res.status(404).send('Bungalov not found')

  const user = User.list.find(user => user.name === req.body.user)

  const booking = user.book(bungalov, req.body.checkInDate, req.body.checkOutDate)

  res.send({
    bungalov: booking.bungalov.name,
    checkInDate: booking.checkInDate,
    checkOutDate: booking.checkOutDate,
  })
})

module.exports = router
