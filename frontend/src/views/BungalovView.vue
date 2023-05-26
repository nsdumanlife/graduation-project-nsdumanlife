<script>
import { mapActions } from 'pinia'
import BookCard from '../components/BookCard.vue'
import IconRating from '../components/icons/IconRating.vue'
import { useBungalovStore } from '../stores/bungalov'

export default {
  name: 'BungalovView',
  components: {
    IconRating,
    BookCard
  },
  data() {
    return {
      bungalov: {},
      showAllPhotos: false,
      currentImageIndex: 0,
      loading: false
    }
  },
  computed: {
    bungalovName() {
      if (this.bungalov) {
        return this.bungalov.name
          .split(' ')
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(' ')
      }
    },
    hasReviews() {
      return this.bungalov.reviews?.length > 0
    }
  },
  methods: {
    ...mapActions(useBungalovStore, ['fetchBungalov'])
  },
  async created() {
    this.loading = true
    this.bungalov = await this.fetchBungalov(this.$route.params.id)
    this.loading = false
  }
}
</script>

<template lang="pug">
.spinner-border(v-if='loading' role="status")
  span.visually-hidden Loading...
main(v-else)
  .header
    h1 {{ bungalovName }}
    .header-details
      .rating-container
        IconRating
        span.rating {{ bungalov.rating || 5 }}
        span.seperator •
      .reviews
        span {{ bungalov.reviews?.length || 0 }} reviews
        span.seperator •
      .location
        span {{ bungalov.location }}
  .gallery-container
    div(v-for="(image, index) in bungalov.images", :key="image._id" )
      img(:src="bungalov.images[index]?.src" :alt="bungalov.images[index]?.alt" :class="{ 'large-image': index === 0 }")
  section
    .details
      .description
        h2 Description
        p {{ bungalov.description }}
      .features
        h2 Amenities
        ul
          li(v-for='amenity in bungalov.amenities') {{ amenity }}
      .reviews
        h2 Reviews
        p(v-if="hasReviews") {{ bungalov.reviews }} reviews
        p(v-else) No reviews yet
    .actions
      BookCard(:bungalov="bungalov")
  RouterLink(to='/bungalovs') Back
</template>

<style lang="scss" scoped>
.spinner-border {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.header-details {
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  .rating-container {
    display: flex;
    align-items: center;

    .rating {
      margin-left: 4px;
    }
  }

  .seperator {
    margin: 0 8px;
  }
}

.gallery-container {
  --gap: 16px;
  --num-cols: 4;
  --row-height: 300px;

  padding: var(--gap);
  display: grid;
  grid-template-columns: repeat(var(--num-cols), 1fr);
  grid-auto-rows: var(--row-height);
  gap: var(--gap);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .large-image {
    grid-column: span 2;
    grid-row: span 2;
  }
}

section {
  margin-top: 32px;
  display: flex;

  .details {
    flex: 3;
    margin-right: 32px;
  }

  .actions {
    flex: 1.65;
    margin-left: 32px;
  }
}

@media screen and (max-width: 1024px) {
  .gallery-container {
    --num-cols: 2;
    --row-height: 200px;
  }
}
</style>
