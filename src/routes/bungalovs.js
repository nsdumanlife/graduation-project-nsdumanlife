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
router.post('/', function (req, res, next) {
  const user = User.list.find(user => user.name === req.body.user)

  const bungalov = user.createBungalov(req.body.name, req.body.price, req.body.location)

  res.send({ name: bungalov.name, price: bungalov.price, location: bungalov.location })
})

module.exports = router
