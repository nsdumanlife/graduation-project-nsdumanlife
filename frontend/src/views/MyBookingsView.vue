<script>
import { useBookingStore } from '@/stores/booking'
import { mapActions } from 'pinia'
import ReviewModal from '../components/ReviewModal.vue'

export default {
  name: 'MyBookingsView',
  components: {
    ReviewModal
  },
  data() {
    return {
      bookings: [],
      loading: false,
      error: null
    }
  },
  async created() {
    this.loading = true
    this.bookings = await this.fetchBookings()
    this.loading = false
  },
  methods: {
    ...mapActions(useBookingStore, ['fetchBookings'])
  }
}
</script>

<template lang="pug">
.spinner-border(v-if='loading' role="status")
  span.visually-hidden Loading...
div(v-else)
  h1 My Bookings
  .bookings-list(v-for="booking in bookings" :key="booking._id")
    .bookings-list-item
      p {{ booking.bungalov.name }}    {{ booking.checkInDate }} / {{ booking.checkOutDate }}
      button.review-btn.btn.btn-outline-success(v-if="!booking.isReviewed && booking.isCompleted" type="button" data-bs-toggle="modal" :data-bs-target="'#reviewModal-' + booking._id") Review
    ReviewModal(:booking="booking" :modalId="'reviewModal-' + booking._id")
</template>

<style lang="scss" scoped>
.spinner-border {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bookings-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  p {
    margin: 0;
  }
}
</style>
