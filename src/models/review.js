class Review {
  createdAt = new Date()

  constructor(bungalov, rating, comment, author) {
    this.bungalov = bungalov
    this.rating = rating
    this.comment = comment
    this.author = author
  }
}

module.exports = Review
