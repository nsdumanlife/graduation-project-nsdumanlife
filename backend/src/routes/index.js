const express = require('express')
const router = express.Router()

const Bungalov = require('../models/bungalov')
const Image = require('../models/image')
const User = require('../models/user')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Bungaa' })
})

router.get('/initialize', async (req, res, next) => {
  const faruk = new User({ name: 'Faruk', email: 'ofaruk@gmail.com' })
  await faruk.setPassword('test')
  await faruk.save()

  const selman = new User({ name: 'selman', email: 'selman@gmail.com' })
  await selman.setPassword('123456')
  await selman.save()

  // Images
  const imgTepeUpstair = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/d58c3075-6aa6-457a-87ca-14ab1161423a.jpg?im_w=1200',
    alt: 'View from the upstairs',
  })

  const imgTepeSaloon = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/b2b6892b-ee08-45bc-b10e-eebc8b529a13.jpg?im_w=1200',
    alt: 'View from the saloon',
  })
  const imgTepeHottub = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/f8186d52-734a-4395-b01e-b53aa30d30ee.jpg?im_w=1200',
    alt: 'View from the hottub',
  })
  const imgTepeBalcony = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/3b46eb8e-c97e-4a6b-a034-d395474cbec8.jpg?im_w=1200',
    alt: 'View from the balcony',
  })

  const imgLionSaloon = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-679718110330054084/original/2f0cb1ed-4b55-44cc-8276-6cdb2235ea1d.jpeg?im_w=960',
    alt: 'View from the saloon',
  })
  const imgLionSaloonWide = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-679718110330054084/original/b59544ba-cc24-474f-bd5c-ce66f2075eb7.jpeg?im_w=1200',
    alt: 'View from the saloon wide angle',
  })
  const imgLionSaloonTop = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-679718110330054084/original/abbfd278-9e06-4672-9b31-29406af794ac.jpeg?im_w=1200',
    alt: 'View from the saloon top angle',
  })
  const imgLionBedroom = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-679718110330054084/original/58fd364b-a967-4aae-b2a9-64081434844e.jpeg?im_w=1200',
    alt: 'View from the bedroom',
  })
  const imgDogancayBalcony = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/73951aa7-5c6e-434f-8a89-7654ea8b634f.jpg?im_w=960',
    alt: 'View from the balcony',
  })
  const imgDogancayOutside = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/a1d7b1ee-a2b4-44d9-946b-eb447cc05868.jpg?im_w=1200',
    alt: 'View from the outside',
  })
  const imgDogancayGardenView = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/29d8174a-9c4c-45b0-b6af-45899d9b3023.jpg?im_w=1200',
    alt: 'View from the garden',
  })
  const imgDogancaySaloon = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/0dba1c7b-d507-4e41-ad6e-9964af63c1d1.jpg?im_w=1200',
    alt: 'View from the saloon',
  })
  const imgDogancayKitchen = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/e571001f-0323-4a19-ae03-f1df3a9202fd.jpg?im_w=1200',
    alt: 'View from the kitchen',
  })
  const imgDogancayFireplace = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/06cbd1f2-c029-48b7-8b37-7989b4455c2c.jpg?im_w=1200',
    alt: 'View from the fireplace',
  })
  const imgDogancayBedroom = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/85fb1456-581c-49a5-893d-23ca69f2c062.jpg?im_w=1200',
    alt: 'View from the bedroom',
  })

  const imageOxygenAirView = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-737401818591696574/original/95741585-6686-4c5d-bd61-26850039214f.jpeg?im_w=960',
    alt: 'View from the air',
  })

  const imageOxygenOutside = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-737401818591696574/original/6a09df6a-2658-4511-a9db-690ea95bd062.jpeg?im_w=1200',
    alt: 'View from the outside',
  })
  const imageOxygenGarden = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-737401818591696574/original/291a9956-d262-4f32-8f2e-e423b88ba1f0.jpeg?im_w=1200',
    alt: 'View of garden',
  })
  const imageOxygenBalcony = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-737401818591696574/original/291a9956-d262-4f32-8f2e-e423b88ba1f0.jpeg?im_w=1200',
    alt: 'View of balcony',
  })
  const imageOxygenSaloon = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-737401818591696574/original/9f5c25ad-d82c-4327-b6cc-75816d5f822b.jpeg?im_w=1200',
    alt: 'View of saloon',
  })
  const imageOxygenKitchen = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-737401818591696574/original/102a9ddc-ed5c-4fd0-b6ab-a5cd9198ee36.jpeg?im_w=1200',
    alt: 'View of kitchen',
  })
  const imageOxygenBedroom = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-737401818591696574/original/3a28e017-512e-4a86-8f18-896c41c37ec2.jpeg?im_w=1200',
    alt: 'View of bedroom',
  })
  const imageOxygenBedroomView = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-737401818591696574/original/c283c97d-1937-4a6c-b0c8-ab14660feb7e.jpeg?im_w=1200',
    alt: 'View of bedroom',
  })
  const imageOxygenBathroom = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/miso/Hosting-737401818591696574/original/0d3e1ff4-edeb-4603-9696-43df457492fe.jpeg?im_w=1200',
    alt: 'View of bathroom',
  })
  const imageTurtleOutside = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/a0df7b2a-f214-4a2f-bb51-7dcc29bc83ab.jpg?im_w=960',
    alt: 'View from outside',
  })
  const imageTurtlePool = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/8a659678-3616-4fef-8c13-8f695bd88954.jpg?im_w=1200',
    alt: 'View of pool',
  })
  const imageTurtleGarden = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/b2686c38-ed99-4135-8a5f-29ade96cdd21.jpg?im_w=1200',
    alt: 'View of garden',
  })
  const imageTurtleSaloon = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/dd93274e-a6be-4826-89a8-757618ff33ec.jpg?im_w=1200',
    alt: 'View of saloon',
  })
  const imageTurtleSecondBedroom = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/8c0c8149-5211-4609-960e-8a46bef1f9b8.jpg?im_w=1200',
    alt: 'View of second bedroom',
  })
  const imageTurtleKitchen = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/1dd69c4e-8114-4d0a-97cc-c21e0ad8f080.jpg?im_w=1200',
    alt: 'View of kitchen',
  })
  const imageTurtleFirstBedroom = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/0e35743f-6899-408f-9e7b-dd01d81ff96f.jpg?im_w=1200',
    alt: 'View of first bedroom',
  })
  const imageTurtleBalcony = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/07fad992-6c8f-478c-82d9-8801bac24297.jpg?im_w=1200',
    alt: 'View of balcony',
  })
  const imageTurtleWinter = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/1ea0db19-b194-469a-9e1e-59a614d8c231.jpg?im_w=1200',
    alt: 'View of winter',
  })
  const imageTurtleWinterGarden = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/e32d2b78-d516-4180-b05d-24e070a8f734.jpg?im_w=1200',
    alt: 'View of garden in winter',
  })
  const imageTurtleBathroom = await Image.create({
    src: 'https://a0.muscache.com/im/pictures/da3cdf03-d41e-42e8-992c-1a8f85f38d2e.jpg?im_w=1200',
    alt: 'View of bathroom',
  })

  // Bungalows
  const tepe = await Bungalov.create({
    name: 'tepe',
    location: 'Sapanca, Sakarya',
    capacity: 8,
    price: 950,
    owner: faruk._id,
    images: [imgTepeUpstair, imgTepeSaloon, imgTepeHottub, imgTepeBalcony],
  })
  const lion = await Bungalov.create({
    name: 'lion',
    location: 'Kumbag, Tekirdag',
    capacity: 4,
    price: 1250,
    images: [imgLionSaloon, imgLionSaloonWide, imgLionSaloonTop, imgLionBedroom],
    owner: faruk._id,
  })
  const dogancay = await Bungalov.create({
    name: 'dogancay',
    location: 'Geyve, Sakarya, Turkey',
    capacity: 5,
    price: 1150,
    images: [
      imgDogancayBalcony,
      imgDogancayOutside,
      imgDogancayGardenView,
      imgDogancaySaloon,
      imgDogancayKitchen,
      imgDogancayFireplace,
      imgDogancayBedroom,
    ],
    owner: faruk._id,
  })
  const oxygen = await Bungalov.create({
    name: 'oxygen',
    location: 'Geyve, Sakarya',
    capacity: 8,
    price: 950,
    images: [
      imageOxygenAirView,
      imageOxygenOutside,
      imageOxygenGarden,
      imageOxygenBalcony,
      imageOxygenSaloon,
      imageOxygenKitchen,
      imageOxygenBedroom,
      imageOxygenBedroomView,
      imageOxygenBathroom,
    ],
    owner: faruk._id,
  })

  // oxygen.services.push('internet', 'barbecue', 'hot tub')

  const checkInDate = new Date('10/22/2024')
  const checkOutDate = new Date('10/29/2024')
  const checkInDate1 = new Date('12/01/2025')
  const checkOutDate1 = new Date('12/05/2025')
  const checkInDate2 = new Date('02/01/2025')
  const checkOutDate2 = new Date('02/03/2025')
  const checkInDateFaruk = new Date('10/17/2025')
  const checkOutDateFaruk = new Date('10/21/2025')

  // await numan.book(lion, checkInDate, checkOutDate)
  // await numan.book(dogancay, checkInDate1, checkOutDate1)
  // await numan.book(tepe, checkInDate2, checkOutDate2)
  // await numan.cancelBooking('631a3c3677b43133a0d1db71')
  // await faruk.book(oxygen, checkInDate2, checkOutDate2)
  // await faruk.review(oxygen, 'Amazing view!', 5)
  const riverband = await selman.createBungalov('riverband', 750, 'Dogancay, Sakarya', 'amazing bungalov', 2, [
    imageTurtleOutside,
    imageTurtlePool,
    imageTurtleGarden,
    imageTurtleSaloon,
    imageTurtleSecondBedroom,
  ])
  const sunnybrook = await selman.createBungalov('sunnybrook', 950, 'Poyrazlar, Sakarya', 'description ...', 4, [
    imageTurtleOutside,
    imageTurtlePool,
    imageTurtleGarden,
    imageTurtleSaloon,
  ])
  const meadowview = await selman.createBungalov('meadowview', 990, 'Dogancay, Sakarya', 'amazing bungalov', 5, [
    imageTurtleOutside,
    imageTurtlePool,
    imageTurtleGarden,
  ])

  const turtle = await faruk.createBungalov(
    'turtle',
    1750,
    'Akbuk, Mugla',
    'lovely bungalov',
    2,
    [
      imageTurtleOutside,
      imageTurtlePool,
      imageTurtleGarden,
      imageTurtleSaloon,
      imageTurtleSecondBedroom,
      imageTurtleKitchen,
      imageTurtleFirstBedroom,
      imageTurtleBalcony,
      imageTurtleWinter,
      imageTurtleWinterGarden,
      imageTurtleBathroom,
    ]
    // [
    //   'Kitchen',
    //   'Wifi',
    //   'Pool',
    //   'Free parking',
    //   'Air conditioning',
    //   'Washer',
    //   'Dryer',
    //   'TV',
    //   'Heating',
    //   'Hot water',
    //   'Iron',
    //   'Hair dryer',
    //   'Shampoo',
    //   'Hangers',
    //   'Smoke alarm',
    //   'Fire extinguisher',
    //   'Carbon monoxide alarm',
    //   'Private entrance',
    //   'BBQ grill',
    //   'Patio or balcony',
    //   'Garden or backyard',
    //   'Beachfront',
    //   'Waterfront',
    //   'Long term stays allowed',
    //   'Luggage dropoff allowed',
    //   'Cleaning before checkout',
    //   'Host greets you',
    //   'Private living room',
    //   'Hot tub',
    //   'Private pool',
    //   'Lake access',
    // ]
  )
  // await faruk.book(turtle, checkInDateFaruk, checkOutDateFaruk)
  // await faruk.review(turtle, 'That was an amazing vacation!', 5)

  // // console.log(numan)
  return res.sendStatus(200)
})

module.exports = router
