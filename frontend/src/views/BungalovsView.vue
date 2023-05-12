<script>
import axios from 'axios'
// import Counter from '../components/Counter.vue'
import { mapActions } from 'pinia'
import BungalovsItemCard from '../components/BungalovsItemCard.vue'
import { useBungalovStore } from '../stores/bungalov'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'BungalovsView',
  components: {
    // Counter,
    BungalovsItemCard
  },
  data() {
    return {
      bungalovs: []
    }
  },
  async created() {
    this.bungalovs = await this.fetchBungalovs()
  },
  methods: {
    ...mapActions(useBungalovStore, ['fetchBungalovs']),
    navigateToBungalov(bungalovId) {
      this.$router.push(`/bungalovs/${bungalovId}`)
    }
  }
}
</script>

<template lang="pug">
.bungalovs
  .row.row-cols-1.row-cols-sm-2.row-cols-md-2.row-cols-lg-3.row-cols-xl-4.row-cols-xxl-5
    .col.g-4.bungalov-item(v-for='bungalov in bungalovs' :key='bungalov._id'  )
      BungalovsItemCard(:bungalov='bungalov' @click="navigateToBungalov(`${bungalov._id}`)" )
</template>

<style lang="scss" scoped>
.bungalov-item {
  margin-bottom: 0.5rem;
}
.container {
  margin: 0;
}
</style>
