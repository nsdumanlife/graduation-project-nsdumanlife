<script>
import { useReviewStore } from '@/stores/review'
import { mapActions } from 'pinia'
import IconRating from '../components/icons/IconRating.vue'

export default {
  name: 'ReviewModal',
  components: { IconRating },
  props: {
    booking: {
      type: Object,
      required: true
    },
    modalId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      rating: 0,
      review: '',
      error: null
    }
  },
  methods: {
    ...mapActions(useReviewStore, ['reviewBooking']),
    async submitReview() {
      await this.reviewBooking(this.booking._id, this.rating, this.review)
      alert('Review submitted successfully!')
      this.rating = 0
      this.review = ''
    },
    isFilled(index) {
      return this.rating > index
    }
  }
}
</script>

<template lang="pug">
div
  //- Modal
  .review-modal.modal.fade(:id='modalId' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true')
    .modal-dialog
      .modal-content
        form(@submit.prevent='submitReview')
          .modal-header
            h1#exampleModalLabel.modal-title.fs-5 Review Your Booking in the {{  booking.bungalov.name }}
            button.btn-close(type='button' data-bs-dismiss='modal' aria-label='Close')
          .modal-body
            img(:src="booking.bungalov.images[0].src" alt="bungalov image")
            .form-group
              label(for='rating') Rating
              .rating-stars
                IconRating(v-for='(star, index) in 5' :key='index' :index='index'  @click='rating = index + 1' :fill='isFilled(index)' :class='{"bi": true, "bi-star-fill": isFilled(index), "bi-star": !isFilled(index)}')
            .form-group
              label(for='review') Review
              textarea.form-control(v-model='review' id='review' rows='3' placeholder='Write your review here...')
          .modal-footer
            button.btn.btn-secondary(type='button' data-bs-dismiss='modal') Close
            button.btn.btn-primary(type='submit') Review
            .error(v-if="error !== null") {{ error }}
</template>

<style lang="scss" scoped>
.modal-content {
  color: #2c3e50;
}
</style>
