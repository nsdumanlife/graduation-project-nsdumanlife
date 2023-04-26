<script>
import { useUserStore } from '@/stores/user'
import { mapActions } from 'pinia'

export default {
  name: 'signup',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['signup']),
    async submitSignup() {
      await this.signup(this.name, this.email, this.password)
      this.$router.push('/login')
    }
  }
}
</script>

<template lang="pug">
.register
  h3 Sign up for Bungaa
  form(@submit.prevent='submitSignup')
    .form-group
      label(for='name') Name
      input#name.form-control(type='text' v-model='name', required)
    .form-group
      label(for='email') Email
      input#email.form-control(type='email' v-model='email', required)
    .form-group
      label(for='password') Password
      input#password.form-control(type='password' v-model='password', required)
    button.btn.btn-primary(type='submit') Sign up
</template>

<style lang="scss" scoped>
.register {
  max-width: 400px;
  margin: 0 auto;
}
</style>
