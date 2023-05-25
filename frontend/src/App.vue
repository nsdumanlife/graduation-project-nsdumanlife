<script>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'

export default {
  name: 'App',
  components: {
    RouterView,
    TheHeader
  }
}
</script>

<template>
  <TheHeader />
  <main>
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>

<style scoped>
main {
  margin: 20px 0;
  padding: 0 40px;
}
</style>
