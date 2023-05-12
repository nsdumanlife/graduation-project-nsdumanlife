<script>
import { mapActions, mapState } from 'pinia'
import { RouterLink } from 'vue-router'
import { useAccountStore } from '../stores/account'

export default {
  name: 'TheHeader',
  components: {
    RouterLink
  },
  computed: {
    ...mapState(useAccountStore, ['user'])
  },
  methods: {
    ...mapActions(useAccountStore, ['fetchUser', 'logout'])
  },
  async mounted() {
    await this.fetchUser()
  }
}
</script>

<template lang="pug">
header.container-header
  .wrapper
    .logo
      RouterLink(to='/')  Bungaa
    .search-bar
      //- input(type='text' placeholder='Search')
    nav
      RouterLink(to='/') Home
      RouterLink(v-if='!user' to='/login') Log in
      RouterLink(v-if='!user' to='/signup') Sign up
      a(v-if='user' @click='logout') Log out
</template>

<style scoped>
header {
  border-bottom: 1px solid var(--color-border);
  height: 82px;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  margin: 0 auto;
  padding: 20px 40px;
}

.logo {
  font-size: 1.6rem;
  font-weight: bold;
}

.search-bar {
  text-align: center;
}
.search-bar input {
  padding: 0 10px;
}

nav {
  font-size: 12px;
  text-align: right;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
