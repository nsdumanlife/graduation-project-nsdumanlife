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
  .row
    .col
      h1 404 Not Found
      p The page you are looking for does not exist.
      RouterLink(to='/') Go back to home page.
</template>
