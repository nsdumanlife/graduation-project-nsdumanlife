const express = require('express')
const router = express.Router()

const Bungalov = require('../models/bungalov')

/* GET bungalovs list. */
router.get('/', function (req, res, next) {
  res.send(
    Bungalov.list
      .map(bungalov => ({ name: bungalov.name, price: bungalov.price, location: bungalov.location }))
      .join('\n\n')
  )
})

module.exports = router
