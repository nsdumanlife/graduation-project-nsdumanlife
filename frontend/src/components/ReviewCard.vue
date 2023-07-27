<script>
import IconRating from '@/components/icons/IconRating.vue'

export default {
  name: 'ReviewCard',
  components: {
    IconRating
  },
  props: {
    review: {
      type: Object,
      required: true
    }
  },
  computed: {
    reviewDate() {
      return new Date(this.review.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<template lang="pug">
article.review-card
  .review-card-header
    .review-card-header-left
      h3 {{ review.author.name }}
    .review-card-header-right
      .rating-container
        IconRating
        span.rating {{ review.rating }}
      span {{ reviewDate }}
  p {{ review.text }}

</template>

<style lang="scss" scoped>
.review-card {
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
  .review-card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    .review-card-header-left {
      display: flex;
      align-items: center;
      h3 {
        margin-right: 1rem;
      }
    }

    .review-card-header-right {
      display: flex;
      align-items: center;
      span {
        margin-left: 1rem;
      }

      .rating-container {
        display: flex;
        align-items: center;
        .rating {
          margin-left: 0.25rem;
        }
      }
    }
  }
}
</style>
