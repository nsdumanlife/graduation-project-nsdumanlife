import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useBookingStore = defineStore('booking', {
  actions: {
    async fetchBookings() {
      return (await axios.get('/bookings')).data
    },
    async bookBungalov(bungalovId, checkInDate, checkOutDate) {
      return (
        await axios.post('/bookings', {
          bungalov: bungalovId,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate
        })
      ).data
    }
  }
})
