import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export const useBungalovStore = defineStore('bungalov', {
  actions: {
    async fetchBungalovs() {
      return (await axios.get('/bungalovs')).data
    },
    async fetchBungalov(id) {
      return (await axios.get(`/bungalovs/${id}`)).data
    }
  }
})
