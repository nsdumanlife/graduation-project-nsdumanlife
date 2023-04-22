<script>
import axios from 'axios'

export default {
  name: 'BungalovsView',
  data() {
    return {
      bungalovs: []
    }
  },
  async created() {
    const { data: bungalovs } = await axios.get('http://localhost:3000/bungalovs')

    this.bungalovs = bungalovs
  }
}
</script>

<template lang="pug">
.bungalovs
  h1 Bungalovs
  ul
    li(v-for='bungalov in bungalovs' :key='bungalov._id')
      RouterLink(:to="`/bungalovs/${bungalov._id}`") {{ bungalov.name }} at {{ bungalov.location }} ${{ bungalov.price }}

</template>

<style></style>
