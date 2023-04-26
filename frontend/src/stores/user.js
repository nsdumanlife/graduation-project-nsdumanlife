import axios from 'axios'
import { defineStore } from 'pinia'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000'

export const useUserStore = defineStore('user', {
  actions: {
    async signup(name, email, password) {
      await axios.post('/users', { name, email, password })
    }
  }
})
