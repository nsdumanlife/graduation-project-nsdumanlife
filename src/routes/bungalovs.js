const express = require('express')
const router = express.Router()

const Bungalov = require('../models/bungalov')
const User = require('../models/user')

/* GET bungalovs list. */
router.get('/', function (req, res, next) {
  res.send(
    Bungalov.list
      .map(bungalov => ({ name: bungalov.name, price: bungalov.price, location: bungalov.location }))
      .join('\n\n')
  )
})

/* POST create a bungalov. */
router.post('/', function (req, res, next) {
  const user = User.list.find(user => user.name === req.body.user)

  const bungalov = user.createBungalov(req.body.name, req.body.price, req.body.location)

  res.send({ name: bungalov.name, price: bungalov.price, location: bungalov.location })
})

module.exports = router
