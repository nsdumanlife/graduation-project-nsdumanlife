class Review {
  createdAt = new Date()

  constructor(bungalov, rating, text, author) {
    this.bungalov = bungalov
    this.rating = rating
    this.text = text
    this.author = author
  }
}

module.exports = Review
