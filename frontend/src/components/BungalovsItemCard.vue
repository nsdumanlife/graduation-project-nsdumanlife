<script>
import IconRating from './icons/IconRating.vue'

export default {
  name: 'BungalovsItemCard',
  components: {
    IconRating
  },
  props: {
    bungalov: {
      type: Object,
      required: true
    }
  },
  computed: {
    bungalovName() {
      return this.bungalov.name
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ')
    }
  }
}
</script>

<template lang="pug">
.card
  //- img.card-img-top.img-fit(:src="bungalov.images[0]?.src" :alt="bungalov.name")
  div(:id="bungalov._id").carousel.slide
    .carousel-indicators
      button(type='button', :data-bs-target="`#${bungalov._id}`",
      v-for="(image, index) in bungalov.images", :key="image._id", :class="{'active': index === 0}", :data-bs-slide-to="index", :aria-current="index === 0", :aria-label="`Slide ${index + 1}`")
    .carousel-inner
      .carousel-item(v-for="(image, index) in bungalov.images", :key="image._id", :class="{'active': index === 0}")
        img.d-block.w-100(:src="bungalov.images[index]?.src", :alt="bungalov.images[index]?.alt")
    button.carousel-control-prev(type='button', :data-bs-target="`#${bungalov._id}`", data-bs-slide='prev' @click.stop)
      span.carousel-control-prev-icon(aria-hidden='true')
      span.visually-hidden Previous
    button.carousel-control-next(type='button', :data-bs-target="`#${bungalov._id}`", data-bs-slide='next' @click.stop)
        span.carousel-control-next-icon(aria-hidden='true')
        span.visually-hidden Next
  .card-body
    h5.card-title
      .card-name {{ bungalovName }}
      .card-rating-container
        IconRating
        .card-rating {{ bungalov.averageRating || 0}}
    p.card-text {{ bungalov.location }}
    div
      span.card-price ${{ bungalov.price }}
      |  night
</template>

<style scoped>
.card {
  height: 100%;
  cursor: pointer;
}
img {
  border-radius: 0.5rem;
}
.card img {
  aspect-ratio: 1.05 / 1;
  object-fit: cover;
}

.card-body {
  display: flex;
  flex-direction: column;
  line-height: 19px;
  padding: 8px 4px;
}

.card-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-rating-container {
  display: flex;
  align-items: center;
}

.card-rating {
  margin-left: 8px;
  font-size: 0.95rem;
}

.card-text {
  color: #717171;
}

.card-price {
  font-weight: 500;
}
</style>
