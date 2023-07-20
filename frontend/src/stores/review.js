import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useReviewStore = defineStore('review', {
  actions: {
    async reviewBooking(bookingId, rating, text) {
      return (
        await axios.post('/reviews', {
          booking: bookingId,
          rating: rating,
          text: text
        })
      ).data
    }
  }
})
