<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  name: 'Counter',
  props: {
    name: String
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(useCounterStore, ['increment', 'decrement'])
  },
  computed: {
    ...mapState(useCounterStore, ['count', 'doubleCount'])
  }
}
</script>

<template lang="pug">
div
  h1 {{ name }}
  h2 Count: {{ count }}
  h4 Double Count: {{ doubleCount }}
  button(@click='increment') +
  button(@click='decrement') -
</template>

<style lang="scss" scoped></style>
