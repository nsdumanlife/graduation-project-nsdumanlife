<script>
import axios from 'axios'

export default {
  name: 'BungalovView',
  data() {
    return {
      bungalov: {}
    }
  },
  async created() {
    const { data: bungalov } = await axios.get(
      `http://localhost:3000/bungalovs/${this.$route.params.id}`
    )
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
