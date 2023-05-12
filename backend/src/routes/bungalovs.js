const express = require('express')
const router = express.Router()
const generateDescription = require('../lib/generate-description')
const Bungalov = require('../models/bungalov')
const User = require('../models/user')

/* GET bungalovs list. */
router.get('/', async function (req, res, next) {
  const bungalovs = await Bungalov.find()

  res.send(bungalovs)
})

// get a bungalov
router.get('/:bungalovId', async function (req, res, next) {
  const bungalov = await Bungalov.findById(req.params.bungalovId)

  if (!bungalov) return res.status(404).send('Bungalov not found')

  res.send(bungalov)
})

// create a bungalov
router.post('/', async function (req, res, next) {
  const user = await User.findById(req.body.user)

  // const description = await generateDescription({
  //   name: req.body.name,
  //   location: req.body.location,
  // })

  const bungalov = await user.createBungalov(
    req.body.name,
    req.body.price,
    req.body.location,
    req.body.description,
    req.body.capacity,
    req.body.images,
    req.body.amenities
  )

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
