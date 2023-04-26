<script>
import axios from 'axios'
import Counter from '../components/Counter.vue'

export default {
  name: 'BungalovsView',
  components: {
    Counter
  },
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

  Counter(name='counter 1')
  Counter(name='counter 2')
</template>

<style></style>
