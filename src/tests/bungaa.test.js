const request = require('supertest')
const app = require('../app')
const chance = require('chance').Chance()

const User = require('../models/user')
const Bungalov = require('../models/bungalov')
const Booking = require('../models/booking')
const Review = require('../models/review')

describe('Bungaa API', () => {
  beforeEach(async () => {
    await User.deleteMany()
    await Bungalov.deleteMany()
    await Booking.deleteMany()
    await Review.deleteMany()
  })

  it('should create a user', async () => {
    const name = chance.name()

    const expectedOutput = { name }

    const actualOutput = await request(app).post('/users').send({ name })

    expect(actualOutput.body).toMatchObject(expectedOutput)
    expect(actualOutput.body.name).toBe(name)
  })

  it('should get a user', async () => {
    const name = chance.name()
    const user = await request(app).post('/users').send({ name })

    const expectedOutput = { name }

    const actualOutput = await request(app).get(`/users/${user.body._id}`)

    expect(actualOutput.body).toMatchObject(expectedOutput)
  })

  it('should get all users', async () => {
    const name = chance.name()
    const user = await request(app).post('/users').send({ name })

    const anotherName = chance.name()
    const anotherUser = await request(app).post('/users').send({ name: anotherName })

    const expectedOutput = [{ name }, { name: anotherName }]

    const actualOutput = await request(app).get('/users')

    expect(actualOutput.body[0]).toMatchObject(expectedOutput[0])
    expect(actualOutput.body[1]).toMatchObject(expectedOutput[1])
    expect(actualOutput.body.length).toBe(2)
  })

  it('should create a bungalov', async () => {
    const name = chance.name()
    const user = await request(app).post('/users').send({ name })

    const bungalovName = chance.word()
    const price = chance.integer({ min: 1, max: 1000 })
    const location = chance.city()
    const actualOutput = await request(app)
      .post('/bungalovs')
      .send({ name: bungalovName, user: user.body._id, price, location })

    const expectedOutput = { name: bungalovName, owner: user, price, location }

    expect(actualOutput.body.name).toBe(expectedOutput.name)
    expect(actualOutput.body.price).toBe(expectedOutput.price)
    expect(actualOutput.body.owner).toMatchObject(expectedOutput.owner.body)
    expect(actualOutput.body.location).toBe(expectedOutput.location)
  })

  it('should get a bungalov', async () => {
    const name = chance.name()
    const user = await request(app).post('/users').send({ name })

    const bungalovName = chance.word()
    const price = chance.integer({ min: 1, max: 1000 })
    const location = chance.city()
    const bungalov = await request(app)
      .post('/bungalovs')
      .send({ name: bungalovName, user: user.body._id, price, location })

    const expectedOutput = { name: bungalovName, owner: user, price, location }

    const actualOutput = await request(app).get(`/bungalovs/${bungalov.body._id}`)

    expect(actualOutput.body.name).toBe(expectedOutput.name)
    expect(actualOutput.body.price).toBe(expectedOutput.price)
    expect(actualOutput.body.owner.name).toBe(expectedOutput.owner.body.name)
    expect(actualOutput.body.location).toBe(expectedOutput.location)
  })

  it('should get all bungalovs', async () => {
    const name = chance.name()
    const user = await request(app).post('/users').send({ name })

    const bungalovName = chance.word()
    const price = chance.integer({ min: 1, max: 1000 })
    const location = chance.city()
    const bungalov = await request(app)
      .post('/bungalovs')
      .send({ name: bungalovName, user: user.body._id, price, location })

    const anotherBungalovName = chance.word()
    const anotherPrice = chance.integer({ min: 1, max: 1000 })
    const anotherLocation = chance.city()
    const anotherBungalov = await request(app)
      .post('/bungalovs')
      .send({ name: anotherBungalovName, user: user.body._id, price: anotherPrice, location: anotherLocation })

    const expectedOutput = [
      { name: bungalovName, owner: user, price, location },
      { name: anotherBungalovName, owner: user, price: anotherPrice, location: anotherLocation },
    ]

    const actualOutput = await request(app).get('/bungalovs')

    expect(actualOutput.body[0].name).toBe(expectedOutput[0].name)
    expect(actualOutput.body[0].price).toBe(expectedOutput[0].price)
    expect(actualOutput.body[0].owner.name).toBe(expectedOutput[0].owner.body.name)
    expect(actualOutput.body[0].location).toBe(expectedOutput[0].location)
    expect(actualOutput.body[1].name).toBe(expectedOutput[1].name)
    expect(actualOutput.body[1].price).toBe(expectedOutput[1].price)
    expect(actualOutput.body[1].owner.name).toBe(expectedOutput[1].owner.body.name)
    expect(actualOutput.body[1].location).toBe(expectedOutput[1].location)
    expect(actualOutput.body.length).toBe(2)
  })

  it('should create a booking', async () => {
    const name = chance.name()
    const user = await request(app).post('/users').send({ name })

    const bungalovName = chance.word()
    const price = chance.integer({ min: 1, max: 1000 })
    const location = chance.city()
    const bungalov = await request(app)
      .post('/bungalovs')
      .send({ name: bungalovName, user: user.body._id, price, location })

    const checkInDate = '2024-01-01'
    const checkOutDate = '2024-01-02'

    const actualOutput = await request(app)
      .post('/bookings')
      .send({ user: user.body._id, bungalov: bungalov.body._id, checkInDate, checkOutDate })

    const expectedOutput = {
      user,
      bungalov,
      checkInDate,
      checkOutDate,
    }

    expect(actualOutput.body.user.name).toBe(expectedOutput.user.body.name)
    expect(actualOutput.body.bungalov.name).toBe(expectedOutput.bungalov.body.name)
    expect(actualOutput.body.checkInDate).toBe(expectedOutput.checkInDate)
    expect(actualOutput.body.checkOutDate).toBe(expectedOutput.checkOutDate)
  })

  it('should get a booking', async () => {
    const name = chance.name()
    const user = await request(app).post('/users').send({ name })

    const bungalovName = chance.word()
    const price = chance.integer({ min: 1, max: 1000 })
    const location = chance.city()
    const bungalov = await request(app)
      .post('/bungalovs')
      .send({ name: bungalovName, user: user.body._id, price, location })

    const checkInDate = '2024-01-01'
    const checkOutDate = '2024-01-02'

    const booking = await request(app)
      .post('/bookings')
      .send({ user: user.body._id, bungalov: bungalov.body._id, checkInDate, checkOutDate })

    const expectedOutput = {
      user,
      bungalov,
      checkInDate,
      checkOutDate,
    }

    const actualOutput = await request(app).get(`/bookings/${booking.body._id}`)

    expect(actualOutput.body.user.name).toBe(expectedOutput.user.body.name)
    // expect(actualOutput.body.bungalov.name).toBe(expectedOutput.bungalov.body.name)
    expect(actualOutput.body.checkInDate).toBe(expectedOutput.checkInDate)
    expect(actualOutput.body.checkOutDate).toBe(expectedOutput.checkOutDate)
  })

  it('should get all bookings', async () => {
    const name = chance.name()
    const user = await request(app).post('/users').send({ name })

    const bungalovName = chance.word()
    const price = chance.integer({ min: 1, max: 1000 })
    const location = chance.city()
    const bungalov = await request(app)
      .post('/bungalovs')
      .send({ name: bungalovName, user: user.body._id, price, location })

    const checkInDate = '2024-01-01'
    const checkOutDate = '2024-01-02'

    const booking = await request(app)
      .post('/bookings')
      .send({ user: user.body._id, bungalov: bungalov.body._id, checkInDate, checkOutDate })

    const anotherCheckInDate = '2024-01-03'
    const anotherCheckOutDate = '2024-01-04'

    const anotherBooking = await request(app).post('/bookings').send({
      user: user.body._id,
      bungalov: bungalov.body._id,
      checkInDate: anotherCheckInDate,
      checkOutDate: anotherCheckOutDate,
    })

    const expectedOutput = [
      {
        user,
        bungalov,
        checkInDate,
        checkOutDate,
      },
      {
        user,
        bungalov,
        checkInDate: anotherCheckInDate,
        checkOutDate: anotherCheckOutDate,
      },
    ]

    const actualOutput = await request(app).get('/bookings')

    expect(actualOutput.body[0].user.name).toBe(expectedOutput[0].user.body.name)
    expect(actualOutput.body[0].bungalov.name).toBe(expectedOutput[0].bungalov.body.name)
    expect(actualOutput.body[0].checkInDate).toBe(expectedOutput[0].checkInDate)
    expect(actualOutput.body[0].checkOutDate).toBe(expectedOutput[0].checkOutDate)
    expect(actualOutput.body[1].user.name).toBe(expectedOutput[1].user.body.name)
    expect(actualOutput.body[1].bungalov.name).toBe(expectedOutput[1].bungalov.body.name)
    expect(actualOutput.body[1].checkInDate).toBe(expectedOutput[1].checkInDate)
    expect(actualOutput.body[1].checkOutDate).toBe(expectedOutput[1].checkOutDate)
    expect(actualOutput.body.length).toBe(2)
  })

  it('should update a booking', async () => {
    const name = chance.name()
    const user = await request(app).post('/users').send({ name })

    const bungalovName = chance.word()
    const price = chance.integer({ min: 1, max: 1000 })
    const location = chance.city()
    const bungalov = await request(app)
      .post('/bungalovs')
      .send({ name: bungalovName, user: user.body._id, price, location })

    const checkInDate = '2024-01-01'
    const checkOutDate = '2024-01-02'

    const booking = await request(app)
      .post('/bookings')
      .send({ user: user.body._id, bungalov: bungalov.body._id, checkInDate, checkOutDate })

    const updatedCheckInDate = '2024-01-03'
    const updatedCheckOutDate = '2024-01-04'

    const actualOutput = await request(app)
      .put(`/bookings/${booking.body._id}`)
      .send({ checkInDate: updatedCheckInDate, checkOutDate: updatedCheckOutDate })

    const expectedOutput = {
      user,
      bungalov,
      checkInDate: updatedCheckInDate,
      checkOutDate: updatedCheckOutDate,
    }

    expect(actualOutput.body.user.name).toBe(expectedOutput.user.body.name)
    expect(actualOutput.body.bungalov.name).toBe(expectedOutput.bungalov.body.name)
    expect(actualOutput.body.checkInDate).toBe(expectedOutput.checkInDate)
    expect(actualOutput.body.checkOutDate).toBe(expectedOutput.checkOutDate)
  })

  it('should delete a booking', async () => {
    const name = chance.name()
    const user = await request(app).post('/users').send({ name })

    const bungalovName = chance.word()
    const price = chance.integer({ min: 1, max: 1000 })
    const location = chance.city()
    const bungalov = await request(app)
      .post('/bungalovs')
      .send({ name: bungalovName, user: user.body._id, price, location })

    const checkInDate = '2024-01-01'
    const checkOutDate = '2024-01-02'

    const booking = await request(app)
      .post('/bookings')
      .send({ user: user.body._id, bungalov: bungalov.body._id, checkInDate, checkOutDate })

    const actualOutput = await request(app).delete(`/bookings/${booking.body._id}`)

    expect(actualOutput.status).toBe(200)
  })

  // it.only('should not create a booking if the check in date is after the check out date', async () => {
  //   const name = chance.name()
  //   const user = await request(app).post('/users').send({ name })

  //   const bungalovName = chance.word()
  //   const price = chance.integer({ min: 1, max: 1000 })
  //   const location = chance.city()
  //   const bungalov = await request(app)
  //     .post('/bungalovs')
  //     .send({ name: bungalovName, user: user.body._id, price, location })

  //   const checkInDate = '2024-01-02'
  //   const checkOutDate = '2024-01-01'

  //   const expectedOutput = {
  //     message: 'The check in date must be before the check out date',
  //   }

  //   const actualOutput = await request(app)
  //     .post('/bookings')
  //     .send({ user: user.body._id, bungalov: bungalov.body._id, checkInDate, checkOutDate })

  //   // expect(() => actualOutput).toThrow(Error)
  // })
})
