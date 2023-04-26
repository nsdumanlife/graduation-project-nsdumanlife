<script>
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

export default {
  name: 'BungalovView',
  data() {
    return {
      bungalov: {}
    }
  },
  async created() {
    const { data: bungalov } = await axios.get(`/bungalovs/${this.$route.params.id}`)
    this.bungalov = bungalov
  }
}
</script>

<template lang="pug">
div(v-if='!bungalov')
  h2 Loading...
div(v-else)
  h2 Bungalov {{ bungalov.name }}
  h3 at {{ bungalov.location }} ${{ bungalov.price }} per night
  RouterLink(to='/bungalovs') Back


</template>
<style></style>
