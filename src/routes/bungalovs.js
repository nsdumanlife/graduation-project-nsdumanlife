const express = require('express')
const router = express.Router()

const Bungalov = require('../models/bungalov')
const User = require('../models/user')

/* GET bungalovs list. */
router.get('/', async function (req, res, next) {
  const bungalovs = await Bungalov.find()

  if (req.query.view === 'json') res.send(bungalovs)

  res.render('bungalovs', { bungalovs })
})

// get a bungalov
router.get('/:bungalovId', async function (req, res, next) {
  const bungalov = await Bungalov.findById(req.params.bungalovId)

  if (!bungalov) return res.status(404).send('Bungalov not found')

  if (req.query.view === 'json') return res.send(bungalov)

  res.render('bungalov-detail', { bungalov })
})

// create a bungalov
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)

  const bungalov = await user.createBungalov(req.body.name, req.body.price, req.body.location)

  res.send(bungalov)
})

// delete a bungalov
// TODO: delete all bookings for this bungalov
// TODO: delete all reviews for this bungalov
// TODO: delete all images for this bungalov
// TODO: delete all amenities for this bungalov
// TODO: delete all rules for this bungalov
// TODO: delete all facilities for this bungalov
router.delete('/:bungalovId', async function (req, res, next) {
  const bungalov = await Bungalov.findByIdAndDelete(req.params.bungalovId)

  if (!bungalov) return res.status(404).send('Bungalov not found')

  res.sendStatus(200)
})

// update a bungalov
router.put('/:bungalovId', async function (req, res, next) {
  const updatedBungalov = await Bungalov.findByIdAndUpdate(
    req.params.bungalovId,
    {
      name: req.body.name,
      price: req.body.price,
      location: req.body.location,
    },
    { new: true }
  )

  res.send(updatedBungalov)
})

module.exports = router
