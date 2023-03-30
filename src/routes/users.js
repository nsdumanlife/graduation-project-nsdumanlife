const express = require('express')
const router = express.Router()

const User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list.map(user => user.profile).join('\n\n'))
})

// create a user with a name
router.post('/', function (req, res, next) {
  const { name } = req.body
  const user = User.create(name)

  res.send(user)
})

//delete a user
router.delete('/:userId', function (req, res, next) {
  const { userId } = req.params
  const user = User.list.find(user => user.name === userId)

  if (!user) throw new Error('User not found')

  const userIndex = User.list.indexOf(user)
  User.list.splice(userIndex, 1)

  res.send(user)
})

module.exports = router
