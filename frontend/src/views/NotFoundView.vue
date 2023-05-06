<script>
import { RouterLink } from 'vue-router'

export default {
  name: 'NotFoundView',
  components: {
    RouterLink
  }
}
</script>

<template lang="pug">
.container
  .not-found
    h1 404 Not Found
    p The page you are looking for does not exist.
    RouterLink(to='/') Go back to home page.
</template>

<style scoped>
.container {
  margin-top: 2rem;
  text-align: center;
}
</style>
