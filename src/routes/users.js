const express = require('express')
const router = express.Router()

const User = require('../models/user')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await User.find())
})

// get a user
router.get('/:userId', async function (req, res, next) {
  const user = await User.findById({ _id: req.params.userId })

  if (!user) throw new Error('User not found')

  res.send(user)
})

// create a user with a name
router.post('/', async function (req, res, next) {
  const user = await User.create({ name: req.body.name })

  res.send(user)
})

//delete a user
router.delete('/:userId', async function (req, res, next) {
  const user = await User.findByIdAndDelete({ _id: req.params.userId })

  if (!user) throw new Error('User not found')

  res.sendStatus(200)
})

module.exports = router
