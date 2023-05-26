<script>
import { mapActions } from 'pinia'
import { useBookingStore } from '../stores/booking'

export default {
  name: 'BookCard',
  props: ['bungalov'],
  data() {
    return {
      checkInDate: '',
      checkOutDate: '',
      adults: 1,
      children: 0,
      showGuestsModal: false,
      error: null
    }
  },
  computed: {
    bookingPrice() {
      const checkInDateAsDate = new Date(this.checkInDate)
      const checkOutDateAsDate = new Date(this.checkOutDate)

      const timeDiff = Math.abs(checkOutDateAsDate.getTime() - checkInDateAsDate.getTime())

      return (this.bungalov.price * timeDiff) / (1000 * 3600 * 24)
    }
  },
  methods: {
    ...mapActions(useBookingStore, ['bookBungalov']),
    toggleGuestModal() {
      this.showGuestsModal = !this.showGuestsModal
    },
    async doBookBungalov() {
      try {
        await this.bookBungalov(this.bungalov._id, this.checkInDate, this.checkOutDate)

        alert('Bungalov booked successfully!')
      } catch (err) {
        this.error = err.response.data.error.message
      }
    }
  }
}
</script>

<template lang="pug">
div
  .booking-card.card
    form.card-body(@submit.prevent='doBookBungalov')
      .price-per-night
        h5.card-title {{ bungalov.price }} $ / night
      .booking-dates.check-in
        label.form-label(for="check-in") Check In
        input#check-in.form-control(type="date" v-model="checkInDate" required)
      .booking-dates.check-out
        label.form-label(for="check-out") Check Out
        input#check-out.form-control(type="date" v-model="checkOutDate" required)
      .booking-guests(@click="toggleGuestModal")
        label.form-label(for="guests") Guests
        p.form-label {{ adults }} adults and {{ children }} children
        .modal-guests(v-if="showGuestsModal")
          .guests-modal
            .adults
              label.form-label(for="adults") Adults
              input#adults.form-control(type="number" v-model="adults" min="1" :max="bungalov.capacity")
            .children
              label.form-label(for="children") Children
              input#children.form-control(type="number" v-model="children" min="0" :max="bungalov.capacity")
      button.btn.btn-outline-info(type='submit') Book Now
      .price-total
        h5.card-title Total: {{ !bookingPrice ? bungalov.price : bookingPrice }} $
      .error(v-if="error !== null") {{ error }}
</template>

<style lang="scss" scoped>
.booking-card {
  max-width: 360px;

  .price-total {
    margin-top: 10px;
    text-align: right;
  }

  .error {
    color: red;
  }
}
</style>
